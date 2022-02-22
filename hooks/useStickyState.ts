import React from "react";

const useStickyState = <T>(
  defaultValue: T,
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = React.useState<T>(undefined);

  React.useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    } else {
      setValue(defaultValue);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export { useStickyState };
