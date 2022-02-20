import faker from 'faker';
// import { sample } from 'lodash';
// utils

// ----------------------------------------------------------------------

const newUser = faker.name.findName();

const users = [...Array(1)].map((_, index) => ({
  id: faker.datatype.uuid(),
  coverPhoto: faker.image.image(),
  name: faker.name.findName(),
  email: faker.internet.email(newUser),
  phone: faker.phone.phoneNumber()
  // company: faker.company.companyName(),
  // isVerified: faker.datatype.boolean(),
  // // status: sample(['active']),
  // role: sample(['Inventory Specialist'])
}));

export default users;
