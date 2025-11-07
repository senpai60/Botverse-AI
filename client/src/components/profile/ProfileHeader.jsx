const ProfileHeader = ({ user }) => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="relative w-32 h-32 rounded-full border-4 border-pink-400 overflow-hidden shadow-lg mb-4">
        <img
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`}
          alt={user.username}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-3xl font-bold text-pink-300">{user.username}</h2>
      <p className="text-white/60 mt-1">{user.email}</p>
    </div>
  );
};

export default ProfileHeader;
