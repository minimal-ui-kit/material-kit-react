import { Helmet } from "react-helmet-async";
import { EditProfileView } from 'src/sections/profile/view/edit-profile-page';
import { Profile } from "src/sections/profile/view/profile-page";
import { useState, useEffect } from "react";
import { useRouter } from "src/routes/hooks";

export default function EditProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/businesses/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch profile");
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setProfile(data.business);
        } else {
          console.error(data.message);
          router.push("/sign-in");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        router.push("/sign-in");
      });
  }, [router]);

  if (!profile) {
    return null; // Render nothing while redirecting
  }

  return (
    <>
      <Helmet>
        <title> Business Profile - {profile.name} </title>
      </Helmet>

      <EditProfileView profile={profile} />
    </>
  );
}
