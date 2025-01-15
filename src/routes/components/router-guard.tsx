import type { ReactNode } from 'react';

import { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useUnsavedChanges } from 'src/contexts/unsaved-changes-context';

type RouterGuardProps = {
  children: ReactNode;
};

export function RouterGuard({ children }: RouterGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasUnsavedChanges, showPrompt, setHasUnsavedChanges } = useUnsavedChanges();
  const lastLocation = useRef(location);

  // Sayfa yenileme ve kapatma kontrolü
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Route değişikliklerini izle
  useEffect(() => {
    if (!hasUnsavedChanges) {
      lastLocation.current = location;
      return;
    }

    if (location !== lastLocation.current) {
      const handleRouteChange = async () => {
        const canNavigate = await showPrompt();
        if (!canNavigate) {
          navigate(lastLocation.current.pathname, { replace: true });
        } else {
          lastLocation.current = location;
          setHasUnsavedChanges(false);
        }
      };

      handleRouteChange();
    }
  }, [location, hasUnsavedChanges, navigate, showPrompt, setHasUnsavedChanges]);

  return children;
}