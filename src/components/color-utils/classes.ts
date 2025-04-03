import { createClasses } from 'src/theme/create-classes';

// ----------------------------------------------------------------------

export const colorPreviewClasses = {
  root: createClasses('color__preview__root'),
  item: createClasses('color__preview__item'),
  label: createClasses('color__preview__label'),
};

export const colorPickerClasses = {
  root: createClasses('color__picker__root'),
  item: {
    root: createClasses('color__picker__item__root'),
    container: createClasses('color__picker__item__container'),
    icon: createClasses('color__picker__item__icon'),
  },
};
