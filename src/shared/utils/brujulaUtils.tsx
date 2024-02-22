import { removeDiacritics } from './busqueda';
import { useStore } from '../context/database';
import { useBlobStorage } from '../context/blobStorage';
import { useAuth } from '../context/auth';
import { QueryConstraint } from 'firebase/firestore';
import { IFirebaseProfile, IFirebaseProfileUpdate } from '../types/user';
import { lang } from '../types/languages';

export function brujulaUtils() {
  const store = useStore();
  const storage = useBlobStorage();
  const auth = useAuth();

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

  const getReviews = async (user?: string) => {
    const userInfo = await getUserInfo(user);
    if (userInfo === undefined) throw 'Could not get user';
    return userInfo.reviews;
  };

  const removeReviews = async (
    userRecommending: string,
    userRecomended: string,
  ) => {
    const docRef = store.getSubcollection('users', userRecomended);
    await store.removeFromFieldArrayByDocRef(
      docRef,
      'reviews',
      userRecommending,
    );
    updateReviewCount(userRecomended);
  };

  const addReview = async (
    userRecommending: string,
    userRecomended: string,
  ) => {
    //se guarda dentro del usuario que esta siendo recomendado
    const docRef = store.getSubcollection('users', userRecomended);
    await store.addToFieldArrayByDocRef(docRef, 'reviews', userRecommending);
    updateReviewCount(userRecomended);
  };

  function updateReviewCount(userRecomended: string) {
    getReviews().then((data) => {
      updateUserInfo({ reviewCount: data.length }, userRecomended);
    });
  }

  // TODO Generalizar métodos para usuario general y no sólo usuario actual

  const getTotalQuerySize = async (queries: QueryConstraint[]) => {
    return await store.getQuerySize(queries);
  };

  const queryUsers = async (queries: QueryConstraint[]) => {
    const data = await store.queryInfo(queries);
    const list = data.map((doc) => ({
      ...doc.data(),
      ...{ email: doc.id },
    }));
    return await Promise.all(
      list.map(async (doc) => {
        const reviews = await getReviews(doc.email);
        return { ...doc, ...{ reviews: reviews } };
      }),
    );
  };

  const deleteUser = async (email: string) => {
    const docRef = store.getSubcollection('users', email);
    await store.deleteInfoByDocRef(docRef);
    await auth.deleteUser(email);
  };

  const updateUserInfo = async (
    userInfo: IFirebaseProfileUpdate,
    email: string = auth.getUserEmail(),
  ) => {
    const data = await store.getInfo('users', email);
    const newData = !data
      ? userInfo
      : {
          ...data,
          ...userInfo,
          searchName:
            (userInfo.name || data.name) &&
            [
              ...(() =>
                !!userInfo.name
                  ? userInfo.name.split(' ')
                  : data.name.split(' '))(),
              ...(() =>
                !!userInfo.lastname
                  ? userInfo.lastname.split(' ')
                  : !!data.lastname
                    ? data.lastname.split(' ')
                    : '')(),
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
              ...(() =>
                !!userInfo.subareas
                  ? userInfo.subareas
                  : !!data.subareas
                    ? data.subareas
                    : [])().map((activity: string) => activity.split('-')[0]),
              // campo área
              ...(() =>
                !!userInfo.subareas
                  ? userInfo.subareas
                  : !!data.subareas
                    ? data.subareas
                    : [])().map((activity: string) => activity[0]),
              // campo idiomas
              ...(() =>
                !!userInfo.languages
                  ? userInfo.languages
                  : !!data.languages
                    ? data.languages
                    : [])().map(({ lang }: { lang: lang }) => `lang:${lang}`),
              userInfo.city || data.city,
              userInfo.state || data.state,
              userInfo.country || data.country,
            ]
              .filter((a) => !!a)
              .map((a) => removeDiacritics(a.toLowerCase())),
        };
    return await store.saveInfo('users', email, newData);
  };

  const getUserInfo = async (email: string = auth.getUserEmail()) => {
    return await store.getInfo('users', email);
  };

  const getCurrentUserInfo = async (email: string = auth.getUserEmail()) => {
    return {
      ...(await store.getInfo('users', email)),
      email: email,
    } as IFirebaseProfile;
  };

  const deleteUserPictures = async () => {
    await storage.deleteFile('/profilePicture');
    await storage.deleteFile('/coverPicture');
  };

  const saveUserPicture = async (
    file: Blob,
    key: string,
    email: string = auth.getUserEmail(),
  ) => {
    if (!file.size) throw Error('File has no size');
    return await storage.uploadFileBytes(key, file, email + '/');
  };

  const saveProfilePicture = async (file: Blob) => {
    return await saveUserPicture(file, 'profilePicture');
  };

  // Hay manera de guardar el URL directo con el objeto de usuario en el store para no estar pidiendo el url a cada rato?

  const getUserPictureUrl = async (
    key: string,
    email: string = auth.getUserEmail(),
  ) => {
    const url = await storage.getFileUrl(key, email + '/');
    updateUserInfo({ profilePicture: url } as IFirebaseProfile);
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

    getTotalQuerySize,
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
