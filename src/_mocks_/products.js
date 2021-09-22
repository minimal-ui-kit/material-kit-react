import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------

const HISTORY_NAME = [
	'First History',
	'My favorite',
	'Take new one',
	'Check here',
	'Nice Book SuperRep Surge',
	'미래의 부',
	'Real Drama',
	'뇌가 좋아하는 공부 사전',
	'악당의 아빠를 꼬셔라. 1(한정판)',
	'A Time to Kill: A Jake Brigance Novel',
	'THE HOUSE OF MIRTH BY EDITH WHARTON',
	'EAST OF EDEN BY JOHN STEINBECK',
	'Little Duty',
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
	'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
];
const PRODUCT_COLOR = [
	'#00AB55',
	'#000000',
	'#FFFFFF',
	'#FFC0CB',
	'#FF4842',
	'#1890FF',
	'#94D82D',
	'#FFC107',
];

// ----------------------------------------------------------------------

const historys = [...Array(24)].map((_, index) => {
	const setIndex = index + 1;

	return {
		id: faker.datatype.uuid(),
		cover: 'https://source.unsplash.com/random' /*mockImgProduct(setIndex)*/,
		name: HISTORY_NAME[index],
		// price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
		// priceSale:
		// 	setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
		// colors:
		// 	(setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
		// 	(setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
		// 	(setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
		// 	(setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
		// 	(setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
		// 	(setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
		// 	PRODUCT_COLOR,
		status: sample(['hot', 'new', '', '']),
		genres: ['Classic', 'Drama', 'Fairytale', 'History', 'Horror'],
		personalScore: faker.datatype.number({ min: 1, max: 10, precision: 0.01 }),
	};
});

export default historys;