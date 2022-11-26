import { useEffect } from "react";
import { store } from "../app/store";

const useOutsideAlerter = (
  ref: any,
  setState: any,
  dispatchState: boolean = false
) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref?.current && !ref?.current.contains(e.target)) {
        if (dispatchState) {
          store.dispatch(setState(false));
        } else {
          setState(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setState]);
};

export default useOutsideAlerter;
