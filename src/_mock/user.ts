import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const products = [...Array(24)].map((_, index) => ({
  order: `#${faker.number.int({ max: 999999 }).toString()}`,
  customer: faker.person.fullName(),
  date: faker.date.recent().toDateString(),
  items: faker.person.fullName(),
  subtotal: faker.number.float().toPrecision(4).toString(),
  netProfit: faker.number.float().toPrecision(4).toString(),
  status: sample(['pending', 'completed', 'cancelled', 'refunded']),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
}));
