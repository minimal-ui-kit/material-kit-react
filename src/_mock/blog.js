// ----------------------------------------------------------------------

const POST_TITLES = [
  'Whiteboard Templates By Industry Leaders',
  'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
  'Designify Agency Landing Page Design',
  '✨What is Done is Done ✨',
  'Fresh Prince',
  'Six Socks Studio',
  'vincenzo de cotiis’ crossing over showcases a research on contamination',
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

const posts = [...Array(23)].map((_, index) => ({
  id: '8a7cd51c-9c4b-4167-a42d-b438f854ed0b',
  cover: `/static/mock-images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: "2022-06-05T15:08:24.818Z",
  view: 2,
  comment: 3,
  share: 4,
  favorite: 5,
  author: {
    name: "fake author Name",
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
