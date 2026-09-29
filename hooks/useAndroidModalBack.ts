'use client';

import { useEffect, useRef } from 'react';

/**
 * Handles physical Android back button & swipe back gestures for modals.
 * Pushes a history state when modal opens, and closes modal on popstate.
 */
export function useAndroidModalBack(isOpen: boolean, onClose: () => void) {
  const isPushedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isOpen) {
      // Push state only once per open
      window.history.pushState({ modalOpen: true }, '');
      isPushedRef.current = true;

      const handlePopState = () => {
        isPushedRef.current = false;
        onClose();
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        // If closed via UI button (X, cancel) rather than browser popstate, clean up pushed state
        if (isPushedRef.current) {
          isPushedRef.current = false;
          if (window.history.state?.modalOpen) {
            window.history.back();
          }
        }
      };
    }
  }, [isOpen, onClose]);
}
