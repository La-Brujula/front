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
    return (await getUserInfo(user)).reviews;
  };

  const removeReviews = async (userRecommending, userRecomended) => {
    const docRef = store.getSubcollection('users', userRecomended);
    await store.removeFromFieldArrayByDocRef(
      docRef,
      'reviews',
      userRecommending
    );
    updateReviewCount(userRecomended);
  };

  const addReview = async (userRecommending, userRecomended) => {
    //se guarda dentro del usuario que esta siendo recomendado
    const docRef = store.getSubcollection('users', userRecomended);
    await store.addToFieldArrayByDocRef(docRef, 'reviews', userRecommending);
    updateReviewCount(userRecomended);
  };

  function updateReviewCount(userRecomended) {
    getReviews().then((data) => {
      updateUserInfo(userRecomended, { reviewCount: data.length });
    });
  }

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
    await auth.deleteUser();
  };

  const updateUserInfo = async (userInfo, email = auth.getUserEmail()) => {
    const data = await store.getInfo('users', email);
    const newData = {
      ...data,
      ...userInfo,
      searchName: [
        ...(() =>
          !!userInfo.name ? userInfo.name.split(' ') : data.name.split(' '))(),
        ...(() =>
          !!userInfo.lastname
            ? userInfo.lastname.split(' ')
            : data.lastname.split(' '))(),
        ...(() =>
          !!userInfo.nickname
            ? userInfo.nickname.split(' ')
            : !!data.nickname
              ? data.nickname.split(' ')
              : [])(),
        // campo actividad
        ...(() =>
          !!userInfo.subareas
            ? userInfo.subareas
            : !!data.subareas
              ? data.subareas
              : [])(),
        // campo subarea
        ...((() =>
          !!userInfo.subareas
            ? userInfo.subareas
            : !!data.subareas
              ? data.subareas
              : [])()).map(activity => activity.split('-')[0]),
        // campo área
        ...((() =>
          !!userInfo.subareas
            ? userInfo.subareas
            : !!data.subareas
              ? data.subareas
              : [])()).map(activity => activity[0]),
        userInfo.city || data.city,
        userInfo.state || data.state,
        userInfo.country || data.country,
      ].map((a) => a.toLowerCase()),
    };
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

  const deleteUserPictures = async () => {
    await storage.deleteFile('/profilePicture');
    await storage.deleteFile('/coverPicture');
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
    deleteUserPictures,

    getCurrentUserEmail,
  };
}
