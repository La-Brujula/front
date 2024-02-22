import {
  deleteObject,
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import firebaseApp from './firebaseApp';
import React, { ReactNode, useContext } from 'react';

export const firestorage = (() => {
  const storage = getStorage(firebaseApp);

  const uploadFileBytes = async (
    name: string,
    file: Blob,
    path = '',
    metadata = {},
  ) => {
    try {
      const reference = ref(storage, path + name);
      const response = await uploadBytes(reference, file);
      return response;
    } catch (err) {
      printError(err);
    }
  };

  const getFileUrl = async (name: string, path = '') => {
    try {
      const reference = ref(storage, path + name);
      const url = await getDownloadURL(reference);
      return url;
    } catch (err) {
      printError(err);
    }
  };

  const getFile = async (name: string, path = '') => {
    try {
      const reference = ref(storage, path + name);
      const file = await getBlob(reference);
      return file;
    } catch (err) {
      printError(err);
    }
  };

  const deleteFile = async (name: string, path = '') => {
    try {
      const reference = ref(storage, path + name);
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

export const StorageContext = React.createContext(firestorage);

export const FirestorageProvider = (props: { children: ReactNode }) => {
  return (
    <StorageContext.Provider value={firestorage}>
      {props.children}
    </StorageContext.Provider>
  );
};

export function useBlobStorage() {
  return useContext(StorageContext);
}
