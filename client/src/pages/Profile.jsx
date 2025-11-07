import { useAuthContext } from "../context/AuthContext";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileActions from "../components/profile/ProfileActions";

const Profile = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-pink-200 text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl">
        <ProfileHeader user={user} />
        <ProfileStats />
        <ProfileActions />
      </div>
    </div>
  );
};

export default Profile;
