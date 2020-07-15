
import React from 'react';

export const useLocalStorage = (key, defaultVal = '') => {
  const [value, setValue] = React.useState(() => (window.localStorage.getItem(key) || defaultVal));
  React.useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue];
};

