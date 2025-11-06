const AuthHeader = ({ isLogin }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-pink-200">
        {isLogin ? "Welcome Back 💕" : "Create Account 💞"}
      </h1>
      <p className="text-white/60 mt-2">
        {isLogin
          ? "Log in to continue your flirty conversations 😉"
          : "Join LoveBot and find your perfect virtual match!"}
      </p>
    </div>
  );
};

export default AuthHeader;
