import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser as firebaseDeleteUser,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
  query,
  getCountFromServer,
} from 'firebase/firestore';
import {
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import React, { useContext, useState } from 'react';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'labrujulaaudiovisual-c163e.firebaseapp.com',
  projectId: 'labrujulaaudiovisual-c163e',
  storageBucket: 'labrujulaaudiovisual-c163e.appspot.com',
  messagingSenderId: '885517889321',
  appId: '1 =885517889321 =web =fb26c1963591eb7e939138',
  measurementId: 'G-XFFBN17QWY',
};

const printError = (error) => {
  if (import.meta.env.NODE_ENV != 'production') {
    console.error(error);
  }
};

const app = initializeApp(firebaseConfig);
export const AuthContext = React.createContext({});

export const FireAuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const _userAuth = async (email, password, method, handleError) => {
    const authResult = (async () => {
      try {
        await setPersistence(auth, browserLocalPersistence).then(() =>
          method(auth, email, password)
        );
        return true;
      } catch (err) {
        setIsLoggedIn(false);
        handleError(err);
        printError(err);
        return false;
      }
    })();
    setIsLoggedIn(authResult);
    return authResult;
  };

  const login = async (email, password, handleError = (err) => {}) => {
    if (!(await firestore.getInfo('users', email))) {
      handleError({ code: 'auth/no-account' });
      return false;
    }
    return _userAuth(email, password, signInWithEmailAndPassword, handleError);
  };

  const register = async (email, password, handleError = (err) => {}) => {
    return _userAuth(
      email,
      password,
      createUserWithEmailAndPassword,
      handleError
    );
  };

  const addStateListener = (fn) => {
    return onAuthStateChanged(auth, fn);
  };

  const logout = () => {
    if (!isLoggedIn) return;
    signOut(auth);
    setIsLoggedIn(false);
  };

  const getUserEmail = () => {
    return auth?.currentUser?.email || '';
  };

  const getUserId = () => {
    return auth?.currentUser?.uid || '';
  };

  function deleteUser() {
    return firebaseDeleteUser(auth.currentUser);
  }

  async function resetUserPassword(userEmail) {
    await sendPasswordResetEmail(auth, userEmail);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        login: login,
        register: register,
        logout: logout,
        addStateListener: addStateListener,
        getUserEmail: getUserEmail,
        getUserId: getUserId,
        isLoggedIn: isLoggedIn,
        deleteUser: deleteUser,
        resetUserPassword: resetUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const firestore = (() => {
  const db = getFirestore(app);

  const getSubcollection = (...args) => {
    window.y = db;
    return args.reduce((docRef, name, index) => {
      return index % 2 == 0 ? collection(docRef, name) : doc(docRef, name);
    }, db);
  };

  const saveInfoByDocRef = async (docRef, object) => {
    await setDoc(docRef, object);
    return true;
  };

  const saveInfo = async (collection, document, object) => {
    return await saveInfoByDocRef(doc(db, collection, document), object);
  };

  const retriveInfoByColRef = async (colRef) => {
    return await getDocs(colRef);
  };

  const retriveInfoByDocRef = async (docRef) => {
    return (await getDoc(docRef)).data();
  };

  const retriveInfo = async (collection, document) => {
    const docRef = doc(db, collection, document);
    return await retriveInfoByDocRef(docRef, document);
  };

  const getQuerySize = async (queries) => {
    return (await getCountFromServer(queries)).data().count;
  };

  const queryInfo = async (queries) => {
    const ref = collection(db, 'users');
    const q = query(ref, ...queries);
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  };

  const deleteInfoByDocRef = async (docRef) => {
    await deleteDoc(docRef);
  };

  const addToFieldArrayByDocRef = async (docRef, field, data) => {
    const updateBody = {};
    updateBody[field] = arrayUnion(data);
    updateDoc(docRef, updateBody);
  };

  const removeFromFieldArrayByDocRef = async (docRef, field, data) => {
    const updateBody = {};
    updateBody[field] = arrayRemove(data);
    await updateDoc(docRef, updateBody);
  };

  return {
    saveInfo: saveInfo,
    getInfo: retriveInfo,
    getSubcollection: getSubcollection,
    saveInfoByDocRef: saveInfoByDocRef,
    retriveInfoByDocRef: retriveInfoByDocRef,
    retriveInfoByColRef: retriveInfoByColRef,
    deleteInfoByDocRef: deleteInfoByDocRef,
    getQuerySize,
    queryInfo,
    addToFieldArrayByDocRef,
    removeFromFieldArrayByDocRef,
  };
})();

export const firestorage = (() => {
  const storage = getStorage(app);

  const uploadFileBytes = async (name, file, path = '', metadata = {}) => {
    try {
      const reference = ref(getStorage(), path + name);
      const response = await uploadBytes(reference, file);
      return response;
    } catch (err) {
      printError(err);
    }
  };

  const getFileUrl = async (name, path = '') => {
    try {
      const reference = ref(getStorage(), path + name);
      const url = await getDownloadURL(reference);
      return url;
    } catch (err) {
      printError(err);
    }
  };

  const getFile = async (name, path = '') => {
    try {
      const reference = ref(getStorage(), path + name);
      const file = await getBlob(reference);
      return file;
    } catch (err) {
      printError(err);
    }
  };

  const deleteFile = async (name, path = '') => {
    try {
      const reference = ref(getStorage(), path + name);
      await deleteObject(reference);
      return true;
    } catch (err) {
      printError(err);
    }
  };

  return {
    uploadFileBytes: uploadFileBytes,
    getFileUrl: getFileUrl,
    getFile: getFile,
    deleteFile: deleteFile,
  };
})();

export const StoreContext = React.createContext(firestore);
export const StorageContext = React.createContext(firestorage);

export function useAuth() {
  return useContext(AuthContext);
}
