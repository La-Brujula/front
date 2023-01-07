import { useContext } from 'react';
import {
  AuthContext,
  StorageContext,
  StoreContext,
} from '@shared/context/firebaseContext';

export function brujulaUtils() {
  const store = useContext(StoreContext);
  const storage = useContext(StorageContext);
  const auth = useContext(AuthContext);

  /*
   * RESEÑAS
   * Como van a estar estructurados en firestore es de la siguiente manera (*Coleccion <Documento> )
   * *users
   *   <user_email>
   *     *reviews
   *       <user_email>
   *           {'rating': int}
   *
   */

  const getReviews = async (user) => {
    const docRef = store.getSubcollection('users', user, 'reviews');
    let reviews_snapshot = await store.retriveInfoByColRef(docRef);
    return reviews_snapshot.docs.map((doc) => doc.data());
  };

  const removeReviews = async (userRecommending, userRecomended) => {
    const docRef = store.getSubcollection(
      'users',
      userRecomended,
      'reviews',
      userRecommending
    );
    await store.deleteInfoByDocRef(docRef);
  };

  const addReview = async (userRecommending, userRecomended, rating) => {
    //se guarda dentro del usuario que esta siendo recomendado
    const docRef = store.getSubcollection(
      'users',
      userRecomended,
      'reviews',
      userRecommending
    );
    await store.saveInfoByDocRef(docRef, {
      from: userRecommending,
      rating: rating,
    });
  };

  // TODO Generalizar métodos para usuario general y no sólo usuario actual

  const queryUsers = async (queries) => {
    const data = await store.queryInfo(queries);
    const list = [];
    data.forEach((doc) => list.push({ ...doc.data(), ...{ email: doc.id } }));
    return await Promise.all(
      list.map(async (doc) => {
        const reviews = await getReviews(doc.email);
        return { ...doc, ...{ reviews: reviews } };
      })
    );
  };

  const deleteUser = async (email) => {
    const docRef = store.getSubcollection('users', email);
    await store.deleteInfoByDocRef(docRef);
  };

  const updateUserInfo = async (userInfo, email = auth.getUserEmail()) => {
    const data = await store.getInfo('users', email);
    const newData = { ...data, ...userInfo };
    return await store.saveInfo('users', email, newData);
  };

  const getUserInfo = async (email = auth.getUserEmail()) => {
    return await store.getInfo('users', email);
  };

  const getCurrentUserInfo = async (email = auth.getUserEmail()) => {
    return {
      ...(await store.getInfo('users', email)),
      email: email,
    };
  };

  const saveUserPicture = async (file, key, email = auth.getUserEmail()) => {
    if (!file.size) throw Error('File has no size');
    return await storage.uploadFileBytes(key, file, email + '/');
  };

  const saveProfilePicture = async (file) => {
    return await saveUserPicture(file, 'profilePicture');
  };

  // Hay manera de guardar el URL directo con el objeto de usuario en el store para no estar pidiendo el url a cada rato?

  const getUserPictureUrl = async (key, email = auth.getUserEmail()) => {
    const url = await storage.getFileUrl(key, email + '/');
    updateUserInfo({ profilePicture: url });
    return url;
  };

  const getProfilePictureUrl = async () => {
    return await getUserPictureUrl('profilePicture');
  };

  const getCurrentUserEmail = () => {
    return auth.getUserEmail();
  };

  return {
    getReviews,
    addReview,
    removeReviews,

    queryUsers,
    deleteUser,

    updateUserInfo,
    getUserInfo,
    getCurrentUserInfo,

    saveProfilePicture,
    saveUserPicture,
    getProfilePictureUrl,
    getUserPictureUrl,
    getCurrentUserEmail,
  };
}
