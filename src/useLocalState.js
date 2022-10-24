import { useEffect, useState } from 'react';

function useLocalState(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(key);
      console.log(`Saved value for ${key}: `, saved);
      console.log('Boolean output for sanity: ', true);
      if (saved !== null) {
        // return JSON.parse(saved);
        if (saved === 'true') return true;
        if (saved === 'false') return false;
        return saved;
      }
    }
    return initial;
  });

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [value]);
  return [value, setValue];
}

export default useLocalState;
