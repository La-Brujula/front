import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useDebounce<T>(
  initialValue: T,
  delay: number = 300,
): [T, Dispatch<SetStateAction<T>>] {
  const [actualValue, setActualValue] = useState(initialValue);
  const [debounceValue, setDebounceValue] = useState(initialValue);
  useEffect(() => {
    const debounceId = setTimeout(() => setDebounceValue(actualValue), delay);
    return () => clearTimeout(debounceId);
  }, [actualValue, delay]);
  return [debounceValue, setActualValue];
}

export default useDebounce;
