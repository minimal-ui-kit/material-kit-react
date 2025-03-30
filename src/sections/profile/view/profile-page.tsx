import { Card, CardContent, CardHeader, Avatar, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "src/routes/hooks";

export type ProfileViewProps = {
  profile: Profile;
};

export type Profile = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  profileImage: string;
  created: string;
};

export function ProfileView({profile} : ProfileViewProps) {
  const router = useRouter();

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          {/* Profile Header */}
          <CardHeader
            avatar={<Avatar src={`http://localhost:3000/${profile.profileImage}` || "/default-profile.png"} sx={{ width: 80, height: 80 }} />}
            title={<Typography variant="h5">{profile.name}</Typography>}
            subheader={<Typography variant="body2" color="text.secondary">{profile.email}</Typography>}
          />

          <CardContent>
            {/* Business Details */}
            <Typography variant="body1" sx={{ mt: 1 }}>
              📞 {profile.phone}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              📍 {profile.address}
            </Typography>

            {/* Edit Profile Button */}
            <Button
              variant="contained"
              startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.878.343a.5.5 0 0 1 .121.354v2.5a.5.5 0 0 1-.146.354l-1.5 1.5a.5.5 0 0 1-.708 0L12.5 3.207l-2-2L13.793.343a.5.5 0 0 1 .085-.085zM11.207 2l2-2L14 .293l-2 2L11.207 2z"/><path fillRule="evenodd" d="M1.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V4zm1 .5v9h9v-9H2z"/></svg>}
              sx={{ mt: 3 }}
              onClick={() => router.push("/edit-profile")}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
