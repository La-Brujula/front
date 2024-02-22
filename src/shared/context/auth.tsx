import {
  Auth,
  AuthError,
  NextOrObserver,
  Unsubscribe,
  User,
  UserCredential,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  deleteUser as firebaseDeleteUser,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import React, { ReactNode, useContext, useState } from 'react';
import firebaseApp from './firebaseApp';

interface FireAuthContext {
  login: (
    email: string,
    password: string,
    handleError: (err: any) => void,
  ) => Promise<boolean>;
  unsafeLogin: (
    email: string,
    password: string,
    handleError: (err: any) => void,
  ) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    handleError: (err: any) => void,
    handleUnsafe: () => void,
  ) => Promise<boolean>;
  logout: () => void;
  addStateListener: (fn: NextOrObserver<User>) => Unsubscribe;
  getUserEmail: () => string;
  getUserId: () => string;
  isLoggedIn: boolean;
  deleteUser: (email: string) => Promise<void>;
  resetUserPassword: (email: string) => Promise<boolean>;
}

export const AuthContext = React.createContext<FireAuthContext>(
  {} as FireAuthContext,
);

export const FireAuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = getAuth(firebaseApp);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const _userAuth = async (
    email: string,
    password: string,
    method: (
      auth: Auth,
      email: string,
      password: string,
    ) => Promise<UserCredential>,
    handleError: (error: any) => void,
  ) => {
    const authResult = await (async () => {
      try {
        await setPersistence(auth, browserLocalPersistence).then(() =>
          method(auth, email, password),
        );
        return true;
      } catch (err) {
        setIsLoggedIn(false);
        handleError(err);
        return false;
      }
    })();
    setIsLoggedIn(authResult);
    return authResult;
  };

  const login = async (
    email: string,
    password: string,
    handleError = (err: unknown) => {},
  ) => {
    return _userAuth(email, password, signInWithEmailAndPassword, handleError);
  };

  const unsafeLogin = async (
    email: string,
    password: string,
    handleError = (err: unknown) => {},
  ) => {
    return _userAuth(email, password, signInWithEmailAndPassword, handleError);
  };

  const register = async (
    email: string,
    password: string,
    handleError = (err: unknown) => {},
    handleUnsafe = () => {},
  ) => {
    return _userAuth(
      email,
      password,
      createUserWithEmailAndPassword,
      async (err: unknown) => {
        if (typeof err !== typeof {}) {
          return handleError(err);
        }
        if (
          (err as AuthError).code == 'auth/email-already-in-use' &&
          (await unsafeLogin(email, password, handleError))
        ) {
          return handleUnsafe();
        }
      },
    );
  };

  const addStateListener = (fn: NextOrObserver<User>) => {
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
    if (!auth.currentUser) throw Error("Can't delete user. Not logged in");
    return firebaseDeleteUser(auth.currentUser);
  }

  async function resetUserPassword(userEmail: string) {
    await sendPasswordResetEmail(auth, userEmail);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        login: login,
        unsafeLogin: unsafeLogin,
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

export function useAuth() {
  return useContext(AuthContext);
}
