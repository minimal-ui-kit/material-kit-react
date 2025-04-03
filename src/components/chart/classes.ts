import { createClasses } from 'src/theme/create-classes';

// ----------------------------------------------------------------------

export const chartClasses = {
  root: createClasses('chart__root'),
  loading: createClasses('chart__loading'),
  legends: {
    root: createClasses('chart__legends__root'),
    item: {
      wrap: createClasses('chart__legends__item__wrap'),
      root: createClasses('chart__legends__item__root'),
      dot: createClasses('chart__legends__item__dot'),
      icon: createClasses('chart__legends__item__icon'),
      label: createClasses('chart__legends__item__label'),
      value: createClasses('chart__legends__item__value'),
    },
  },
};
