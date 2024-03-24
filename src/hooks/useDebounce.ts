import React, { useEffect, useState } from "react";

const useDebounce = (changedValue: string, delayTime: number) => {
  const [debouncedValue, setDebouncedValue] = useState(changedValue);

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      setDebouncedValue(changedValue);
    }, delayTime);

    return () => clearTimeout(timeoutId);

  }, [changedValue, delayTime]);

  return debouncedValue;
};

export default useDebounce;
