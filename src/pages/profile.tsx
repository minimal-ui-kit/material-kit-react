import { Helmet } from "react-helmet-async";
import { ProfileView } from 'src/sections/profile/view/profile-page';
import { _myBusinessProfile } from "src/_mock";

export default function ProfilePage() {

  return (
    <>
      <Helmet>
        <title> Business Profile - {_myBusinessProfile.name} </title>
      </Helmet>

      <ProfileView profile={_myBusinessProfile} />
    </>
  );
}
