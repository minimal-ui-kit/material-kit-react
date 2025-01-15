import type { ReactNode} from 'react';

import { useMemo, useState, useContext, useCallback, createContext } from 'react';

type UnsavedChangesContextType = {
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
  showPrompt: () => Promise<boolean>;
};

const UnsavedChangesContext = createContext<UnsavedChangesContextType | null>(null);

type UnsavedChangesProviderProps = {
  children: ReactNode;
};

export function UnsavedChangesProvider({ children }: UnsavedChangesProviderProps) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const showPrompt = useCallback(() => new Promise<boolean>((resolve) => {
    if (!hasUnsavedChanges) {
      resolve(true);
      return;
    }

    const userWantsToLeave = window.confirm(
        'Kaydedilmemiş değişiklikleriniz var. Çıkmak istediğinizden emin misiniz?'
    );
    resolve(userWantsToLeave);
  }), [hasUnsavedChanges]);

  const value = useMemo(() => ({
    hasUnsavedChanges,
    setHasUnsavedChanges,
    showPrompt,
  }), [hasUnsavedChanges, showPrompt]);

  return (
      <UnsavedChangesContext.Provider value={value}>
        {children}
      </UnsavedChangesContext.Provider>
  );
}

export const useUnsavedChanges = () => {
  const context = useContext(UnsavedChangesContext);

  if (!context) {
    throw new Error('useUnsavedChanges must be used within UnsavedChangesProvider');
  }

  return context;
};