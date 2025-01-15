import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile/view';

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title>Profil | Lojistik Yönetim Sistemi</title>
      </Helmet>

      <ProfileView />
    </>
  );
} 