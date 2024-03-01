
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  Logo: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  Name: faker.person.fullName(),
  Points: faker.datatype.number({ min: 10, max: 100 }) // 36.94

}));
