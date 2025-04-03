import { createClasses } from 'src/theme/create-classes';

// ----------------------------------------------------------------------

export const layoutClasses = {
  root: createClasses('layout__root'),
  main: createClasses('layout__main'),
  header: createClasses('layout__header'),
  nav: {
    root: createClasses('layout__nav__root'),
    mobile: createClasses('layout__nav__mobile'),
    vertical: createClasses('layout__nav__vertical'),
    horizontal: createClasses('layout__nav__horizontal'),
  },
  content: createClasses('layout__main__content'),
  sidebarContainer: createClasses('layout__sidebar__container'),
};
