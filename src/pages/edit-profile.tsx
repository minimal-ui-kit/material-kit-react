import { Helmet } from "react-helmet-async";
import { EditProfileView } from 'src/sections/profile/view/edit-profile-page';
import { _myBusinessProfile } from "src/_mock"; // mock data, use API call here

export default function EditProfilePage() {

  return (
    <>
      <Helmet>
        <title> Business Profile - {_myBusinessProfile.name} </title>
      </Helmet>

      <EditProfileView profile={_myBusinessProfile} />
    </>
  );
}
