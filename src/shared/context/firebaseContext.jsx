import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, getDocs, deleteDoc, collection } from 'firebase/firestore'
import { getBlob, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useContext } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDxD3hf4Vmiea-GZUW27GABNAlUlemw4i0",
    authDomain: "labrujulaaudiovisual-c163e.firebaseapp.com",
    projectId: "labrujulaaudiovisual-c163e",
    storageBucket: "labrujulaaudiovisual-c163e.appspot.com",
    messagingSenderId: "885517889321",
    appId: "1 =885517889321 =web =fb26c1963591eb7e939138",
    measurementId: "G-XFFBN17QWY"
};

const printError = (error) => {
    if(import.meta.env.NODE_ENV != "production"){
        console.error(error)
    }
}

const app = initializeApp(firebaseConfig);

export const fireauth = (() => {
    const auth = getAuth(app);
    const _userAuth = async (email, password, method, handleError) => {
        try {
            const result = await method(auth, email, password)
            console.log(result);
            return true
        } catch (err) {
            handleError(err)
            printError(err)
            return false
        }
    }

    const login = async (email, password, handleError = (err) => { }) => {
        return _userAuth(email, password, signInWithEmailAndPassword, handleError)
    }

    const register = (email, password, handleError = (err) => { }) => {
        return _userAuth(email, password, createUserWithEmailAndPassword, handleError)
    }

    const addStateListener = (fn) => {
        return onAuthStateChanged(auth, fn)
    }
    
    const isLoggedIn = () => {
        return auth.currentUser != null
    }

    const logout = () => {
        if (isLoggedIn()) {
            signOut(auth)
        }
    }

    const getUserEmail = () => {
        if (isLoggedIn()){
            return auth.currentUser.email
        }
        else
            return ""
    }

    const getUserId = () => {
        if (isLoggedIn()) return auth.currentUser.uid
        else return ""
    }


    return {
        login: login,
        register: register,
        logout: logout,
        addStateListener: addStateListener,
        getUserEmail: getUserEmail,
        getUserId: getUserId,
        isLoggedIn: isLoggedIn
    }
})()

export const firestore = (() => {

    const db = getFirestore(app)

    const getSubcollection = (...args) => {
        window.y = db
        return args.reduce((docRef, name, index) => {
            return (index%2 == 0)?  collection(docRef, name) : doc(docRef, name)
        }, db)
    }

    const saveInfoByDocRef = async (docRef, object) => {
        try {
            await setDoc(docRef, object);
            return true;
        } catch (e) {
            printError(e)
            return false
        }
    }

    const saveInfo = async (collection, document, object) => {
        return await saveInfoByDocRef(doc(db, collection, document), object)
    }

    const retriveInfoByColRef = async (colRef) => {
        try {
            const docSnap = await getDocs(colRef);
            return docSnap
        } catch (e) {
            printError(e)
            return false;
        }
    }

    const retriveInfoByDocRef = async (docRef) => {
        try {
            const docSnap = await getDoc(docRef);
            return docSnap.data();
        } catch (e) {
            printError(e)
            return false;
        }
    }

    const retriveInfo = async (collection, document) => {
        
        const docRef = doc(db, collection, document);
        return await retriveInfoByDocRef(docRef, document)
        
    }

    const deleteInfoByDocRef = async (docRef) => {
        try {
            await deleteDoc(docRef);
        } catch (e) {
            printError(e)
            return false;
        }
    }
    

    return {
        saveInfo: saveInfo,
        getInfo: retriveInfo,
        getSubcollection: getSubcollection,
        saveInfoByDocRef: saveInfoByDocRef,
        retriveInfoByDocRef: retriveInfoByDocRef,
        retriveInfoByColRef: retriveInfoByColRef,
        deleteInfoByDocRef: deleteInfoByDocRef
    }
})()

export const firestorage = (() => {

    const storage = getStorage(app);

    const uploadFileBytes = async (name, file, path='', metadata={}) => {
        try{
            const reference = ref(getStorage(), path+name)
            const response = await uploadBytes(reference, file)
            return response
        } catch(err) {
            printError(err)
        }
    }

    const getFileUrl = async (name, path='') => {
        try{
            const reference = ref(getStorage(), path+name)
            const url = await getDownloadURL(reference)
            return url
        } catch (err) {
            printError(err)
        }

    }

    const getFile = async (name, path='') => {
        try{
            const reference = ref(getStorage(), path+name)
            const file = await getBlob(reference)
            return file
        } catch (err) {
            printError(err)
        }
    }

    return {
        uploadFileBytes: uploadFileBytes,
        getFileUrl: getFileUrl,
        getFile: getFile
    }

})()

export const AuthContext = React.createContext(fireauth)
export const StoreContext = React.createContext(firestore) 
export const StorageContext = React.createContext(firestorage)

export function useAuth() {
    return useContext(AuthContext);
  }