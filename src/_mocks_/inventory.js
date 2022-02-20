import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Nike Air Force 1 NDESTRUKT',
  'Nike Space Hippie 04',
  'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
  'Nike Blazer Low 77 Vintage',
  'Nike ZoomX SuperRep Surge',
  'Zoom Freak 2',
  'Nike Air Max Zephyr',
  'Jordan Delta',
  'Air Jordan XXXV PF',
  'Nike Waffle Racer Crater',
  'Kyrie 7 EP Sisterhood',
  'Nike Air Zoom BB NXT',
  'Nike Air Force 1 07 LX',
  'Nike Air Force 1 Shadow SE',
  'Nike Air Zoom Tempo NEXT%',
  'Nike DBreak-Type',
  'Nike Air Max Up',
  'Nike Air Max 270 React ENG',
  'NikeCourt Royale',
  'Nike Air Zoom Pegasus 37 Premium',
  'Nike Air Zoom SuperRep',
  'NikeCourt Royale',
  'Nike React Art3mis',
  'Nike React Infinity Run Flyknit A.I.R. Chaz Bear'
];

const inventory = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    productImage: mockImgProduct(setIndex),
    productName: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    quantity: faker.datatype.number({ min: 4, max: 99, precision: 1 })
    // priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    // status: sample(['back order', 'in stock', '', ''])
  };
});

export default inventory;
