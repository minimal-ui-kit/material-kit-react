import { useContext, createContext } from 'react';

export interface SettingsContextProps {
  themeStretch: boolean;
}

export const SettingsContext = createContext({} as SettingsContextProps);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be used inside SettingsProvider');

  return context;
}; 