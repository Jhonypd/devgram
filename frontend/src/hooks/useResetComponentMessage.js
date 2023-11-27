// redux
import { resetMessage } from "../slices/photoSlice";

export const useResetComponentMessage = (dispach) => {
  return () => {
    setTimeout(() => {
      dispach(resetMessage());
    }, 2000);
  };
};
