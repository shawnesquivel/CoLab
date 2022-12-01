import { useEffect } from "react";

const useUpdateLogger = (value) => {
  useEffect(() => {
    console.log(value);
  }, [value]);
};

export default useUpdateLogger;
