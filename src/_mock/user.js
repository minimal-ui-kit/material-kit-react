import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: '43eb10f4-c91a-4485-8313-70629911ecdc',
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: "Fake Name",
  company: "Fake Company Name",
  isVerified: true,
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
