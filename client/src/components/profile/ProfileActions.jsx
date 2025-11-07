import { useAuthContext } from "../../context/AuthContext";

const ProfileActions = () => {
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth"; // instant redirect after logout
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold hover:brightness-110 transition"
      >
        Logout
      </button>
      <button className="px-6 py-2 bg-white/10 border border-white/20 rounded-xl text-pink-200 font-semibold hover:bg-white/20 transition">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileActions;
