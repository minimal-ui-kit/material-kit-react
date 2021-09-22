import faker from 'faker';
// utils
import { mockImgCover } from '../utils/mockImages';

// ----------------------------------------------------------------------

const POST_TITLES = [
	'preset Data',
	'인공지능이 바꾸는 미래세상과 메타버스',
	'미래의 부',
	'✨ 파이썬으로 만드는 인공지능 ✨',
	'헬로! 인공지능 생활코딩 머신러닝: 실습편 with 오렌지3',
	'뇌가 좋아하는 공부 사전',
	'악당의 아빠를 꼬셔라. 1(한정판)',
	'Simple, Great Looking Animations in Your Project | Video Tutorial',
	'40 Free Serif Fonts for Digital Designers',
	'Examining the Evolution of the Typical Web Design Client',
	'Katie Griffin loves making that homey art',
	'The American Dream retold through mid-century railroad graphics',
	'Illustration System Design',
	'CarZio-Delivery Driver App SignIn/SignUp',
	'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
	'Tylko Organise effortlessly -3D & Motion Design',
	'RAYO ?? A expanded visual arts festival identity',
	'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
	'Inside the Mind of Samuel Day',
	'Portfolio Review: Is This Portfolio Too Creative?',
	'Akkers van Margraten',
	'Gradient Ticket icon',
	'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
	'How to Animate a SVG with border-image',
];

const posts = [...Array(24)].map((_, index) => ({
	id: faker.datatype.uuid(),
	cover: /*'https://source.unsplash.com/random'*/mockImgCover(index + 1),
	title: POST_TITLES[index],
	createdAt: faker.date.past(),
	view: faker.datatype.number(),
	comment: faker.random.number({ min: 0, max: 100.0 }),
	share: faker.datatype.number(),
	favorite: faker.datatype.number(),
	author: {
		name: faker.name.findName(),
		avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
	},
	genres: ['Classic', 'Drama', 'Fairytale', 'History', 'Horror'],
	score: faker.random.number({ min: 0.0, max: 10.0, precision: 0.01 }),
}));

export default posts;