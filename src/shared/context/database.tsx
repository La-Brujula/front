import {
  DocumentData,
  DocumentReference,
  Query,
  QueryConstraint,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { ReactNode, useContext } from 'react';
import firebaseApp from './firebaseApp';

export const firestore = (() => {
  const db = getFirestore(firebaseApp);

  const getSubcollection = (
    collectionName: string,
    subCollectionName: string,
  ) => {
    const col = collection(db, collectionName);
    return doc(col, subCollectionName);
  };

  const saveInfoByDocRef = async (
    docRef: DocumentReference<DocumentData>,
    object: any,
  ) => {
    await setDoc(docRef, object);
    return true;
  };

  const saveInfo = async (
    collection: string,
    document: string,
    object: object,
  ) => {
    return await saveInfoByDocRef(doc(db, collection, document), object);
  };

  const retriveInfoByColRef = async (colRef: Query) => {
    return await getDocs(colRef);
  };

  const retriveInfoByDocRef = async (
    docRef: DocumentReference<DocumentData>,
  ) => {
    return (await getDoc(docRef)).data();
  };

  const retriveInfo = async (collection: string, document: string) => {
    const docRef = doc(db, collection, document);
    return await retriveInfoByDocRef(docRef);
  };

  const getQuerySize = async (queries: QueryConstraint[]) => {
    const ref = collection(db, 'users');
    const q = query(ref, ...queries);
    return (await getCountFromServer(q)).data().count;
  };

  const queryInfo = async (queries: QueryConstraint[]) => {
    const ref = collection(db, 'users');
    const q = query(ref, ...queries);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  };

  const deleteInfoByDocRef = async (
    docRef: DocumentReference<DocumentData>,
  ) => {
    await deleteDoc(docRef);
  };

  const addToFieldArrayByDocRef = async (
    docRef: DocumentReference<DocumentData>,
    field: string,
    data: any,
  ) => {
    const updateBody = {
      [field]: arrayUnion(data),
    };
    updateDoc(docRef, updateBody);
  };

  const removeFromFieldArrayByDocRef = async (
    docRef: DocumentReference<DocumentData>,
    field: string,
    data: any,
  ) => {
    const updateBody = {
      [field]: arrayRemove(data),
    };
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

export const StoreContext = React.createContext(firestore);

export const FirestoreProvider = (props: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={firestore}>
      {props.children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  return useContext(StoreContext);
}
