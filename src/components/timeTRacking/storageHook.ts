import { useState } from "react";

export function useTimeLocalStorage(key: any, initialValue: any, parseValue = (v: any) => v) {
  const [item, setValue] = useState(() => {
    const value = parseValue(localStorage.getItem(key)) || initialValue;
    localStorage.setItem(key, value);
    return value;
  });
  const setItem = (newValue: any) => {
    setValue(newValue);
    window.localStorage.setItem(key, newValue);
  };
  return [item, setItem];
}
