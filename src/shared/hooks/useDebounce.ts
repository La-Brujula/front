import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';

function useDebounce<T>(
  initialValue: T,
  delay: number = 300,
  onChange?: (value: T) => void
): [T, Dispatch<SetStateAction<T>>] {
  const [actualValue, setActualValue] = useState(initialValue);
  const [debounceValue, setDebounceValue] = useState(initialValue);
  useEffect(() => {
    const debounceId = setTimeout(() => {
      setDebounceValue(actualValue);
      onChange !== undefined && onChange(actualValue);
    }, delay);
    return () => clearTimeout(debounceId);
  }, [actualValue, delay]);
  return [debounceValue, setActualValue];
}

export default useDebounce;
