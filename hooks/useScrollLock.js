import { useEffect } from "react";

/**
 * Custom hook to lock body scroll when modal or mobile menu is active.
 * @param {boolean} isLocked - Whether scroll should be locked
 */
export function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}

