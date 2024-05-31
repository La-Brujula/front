import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useDebounce<T>(
  initialValue: T,
  delay: number = 300,
  onChange?: (value: T) => void
): [T, Dispatch<SetStateAction<T>>] {
  const [realtimeValue, setValue] = useState(initialValue);
  const [value, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const debounceId = setTimeout(() => {
      setDebouncedValue(realtimeValue);
    }, delay);
    return () => clearTimeout(debounceId);
  }, [realtimeValue, delay]);

  useEffect(() => {
    onChange !== undefined && onChange(value);
  }, [value]);

  return [value, setValue];
}

export default useDebounce;
