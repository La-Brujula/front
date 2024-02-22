import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useEffect, useState } from 'react';
import { IFirebaseProfile, IFirebaseProfileUpdate } from '../types/user';

export const useUserInfo = (email = '') => {
  if (!email) return { user: undefined, error: undefined, loading: undefined };
  const brujula = brujulaUtils();
  const [user, setUser] = useState<IFirebaseProfile>({} as IFirebaseProfile);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        email = email === '' ? brujula.getCurrentUserEmail() : email;
        const data = await brujula.getCurrentUserInfo(email);
        setUser({
          ...data,
          location:
            data.city && data.state ? `${data.city}, ${data.state}` : '',
        });
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error(e);
      }
    })();
  }, [email]);

  return { user, loading, error };
};
