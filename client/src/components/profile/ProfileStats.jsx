const ProfileStats = () => {
  const stats = [
    { label: "Bots Created", value: 3 },
    { label: "Messages Sent", value: 148 },
    { label: "Loves Found", value: 2 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8 text-center">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="p-4 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-md"
        >
          <p className="text-2xl font-bold text-pink-300">{stat.value}</p>
          <p className="text-sm text-white/70 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
