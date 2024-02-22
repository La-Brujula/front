import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useDebounce(
  initialValue: string,
  delay: number,
): [string, Dispatch<SetStateAction<string>>] {
  const [actualValue, setActualValue] = useState(initialValue);
  const [debounceValue, setDebounceValue] = useState(initialValue);
  useEffect(() => {
    const debounceId = setTimeout(() => setDebounceValue(actualValue), delay);
    return () => clearTimeout(debounceId);
  }, [actualValue, delay]);
  return [debounceValue, setActualValue];
}

export default useDebounce;
