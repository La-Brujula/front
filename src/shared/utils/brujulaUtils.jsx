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
    const docRef = store.getSubcollection('user', user, 'reviews');
    let reviews_snapshot = await store.retriveInfoByColRef(docRef);
    console.log(reviews_snapshot);
    return reviews_snapshot.docs.map((doc) => doc.data());
  };

  const removeReviews = async (userRecommending, userRecomended) => {
    const docRef = store.getSubcollection(
      'user',
      userRecomended,
      'reviews',
      userRecommending
    );
    await store.deleteInfoByDocRef(docRef);
  };

  const addReview = async (userRecommending, userRecomended, rating) => {
    //se guarda dentro del usuario que esta siendo recomendado
    const docRef = store.getSubcollection(
      'user',
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

  const updateUserInfo = async (userInfo) => {
    const data = await store.getInfo('users', auth.getUserEmail());
    const newData = { ...data, ...userInfo };
    return await store.saveInfo('users', auth.getUserEmail(), newData);
  };

  const getUserInfo = async () => {
    return await store.getInfo('users', auth.getUserEmail());
  };

  const getCurrentUserInfo = async () => {
    return {
      ...(await store.getInfo('users', auth.getUserEmail())),
      email: auth.getUserEmail(),
    };
  };

  const saveUserPicture = async (file, key) => {
    return await storage.uploadFileBytes(key, file, auth.getUserEmail() + '/');
  };

  const saveProfilePicture = async (file) => {
    return await saveUserPicture(file, 'profilePicture');
  };

  // Hay manera de guardar el URL directo con el objeto de usuario en el store para no estar pidiendo el url a cada rato?

  const getUserPictureUrl = async (key) => {
    return await storage.getFileUrl(key, auth.getUserEmail() + '/');
  };

  const getProfilePictureUrl = async () => {
    return await getUserPictureUrl('profilePicture');
  };

  return {
    getReviews,
    addReview,
    removeReviews,

    updateUserInfo,
    getUserInfo,
    getCurrentUserInfo,

    saveProfilePicture,
    saveUserPicture,
    getProfilePictureUrl,
    getUserPictureUrl,
  };
}
