import { themeConfig } from './theme-config';

// ----------------------------------------------------------------------

export function createClasses(className: string): string {
  return `${themeConfig.classesPrefix}__${className}`;
}
