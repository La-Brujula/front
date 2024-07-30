import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Account,
  IAuthResponse,
  changePasswordService,
  loginService,
  resetPasswordService,
  signUpService,
} from '../services/authServices';
import { UserType } from '../types/user';

import { createContext, useContextSelector } from 'use-context-selector';
import { usePostHog } from 'posthog-js/react';

interface IAuthContext {
  account: Account | null;
  token: string | null;
  login: (authValues: {
    email: string;
    password: string;
  }) => Promise<IAuthResponse>;
  logout: () => Promise<any>;
  signup: (authValues: {
    email: string;
    password: string;
    type: UserType;
    referal?: string;
  }) => Promise<IAuthResponse>;
  isLoggedIn: boolean;
  sendPasswordReset: (authValues: { email: string }) => Promise<undefined>;
  changeUserPassword: (authValues: {
    email: string;
    password: string;
    code: string;
  }) => Promise<IAuthResponse>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function UserProvider(props: { children: ReactNode }) {
  const posthog = usePostHog();
  const [account, setAccount] = useState<Account | null>(
    JSON.parse(localStorage.getItem('account') || 'null')
  );
  const [token, setToken] = useState<string | null>(
    JSON.parse(localStorage.getItem('jwt') || 'null') || ''
  );

  useEffect(() => {
    if (account !== null && !!posthog) {
      // Identify sends an event, so you want may want to limit how often you call it
      posthog.identify(account.ProfileId, {
        email: account.email,
      });
      posthog.group('role', account.role);
    }
  }, [posthog, account]);

  const login = useCallback(
    async (authValues: {
      email: string;
      password: string;
    }): Promise<IAuthResponse> => {
      const res = await loginService(authValues.email, authValues.password);
      localStorage.setItem('jwt', `"${res.entity.token}"`);
      localStorage.setItem('account', JSON.stringify(res.entity.account));
      setAccount(res.entity.account);
      setToken(res.entity.token);
      return res.entity;
    },
    [setAccount, setToken]
  );

  const signup = useCallback(
    async (authValues: {
      email: string;
      password: string;
      type: 'moral' | 'fisica';
      referal?: string;
    }): Promise<IAuthResponse> => {
      const res = await signUpService(
        authValues.email,
        authValues.password,
        authValues.type,
        authValues.referal
      );
      localStorage.setItem('jwt', `"${res.entity.token}"`);
      localStorage.setItem('account', JSON.stringify(res.entity.account));
      setAccount(res.entity.account);
      setToken(res.entity.token);
      return res.entity;
    },
    [setAccount, setToken]
  );

  const logout = useCallback(async (): Promise<any> => {
    setAccount(null);
    setToken(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('account');
  }, [setAccount, setToken]);

  const isLoggedIn = token !== null && account !== null;

  const sendPasswordReset = useCallback(
    async (authValues: { email: string }) => {
      const res = await resetPasswordService(authValues.email);
      return res.entity;
    },
    []
  );

  const changeUserPassword = useCallback(
    async (authValues: { email: string; password: string; code: string }) => {
      const res = await changePasswordService(
        authValues.email,
        authValues.password,
        authValues.code
      );
      setAccount(res.entity.account);
      localStorage.setItem('account', JSON.stringify(account));
      setToken(res.entity.token);
      localStorage.setItem('jwt', `"${token}"`);
      return res.entity;
    },
    [setAccount, setToken]
  );

  const providerValue = useMemo(
    () => ({
      account,
      token,
      login,
      logout,
      signup,
      isLoggedIn,
      sendPasswordReset,
      changeUserPassword,
    }),
    [
      account,
      token,
      login,
      logout,
      signup,
      isLoggedIn,
      sendPasswordReset,
      changeUserPassword,
    ]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth(propertyList: (keyof IAuthContext)[]): IAuthContext {
  return useContextSelector(AuthContext, (v) =>
    Object.fromEntries(
      Object.entries(v).filter(([k, _]) =>
        propertyList.includes(k as keyof IAuthContext)
      )
    )
  ) as IAuthContext;
}
