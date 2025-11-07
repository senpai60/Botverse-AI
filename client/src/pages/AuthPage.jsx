import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AuthForm from "../components/auth/AuthForm";
import AuthHeader from "../components/auth/AuthHeader";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  // 👇 redirect when user updates
  useEffect(() => {
    if (!loading && user) {
      console.log("🚀 Redirecting because user is now logged in:", user);
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]); // re-run when user changes

  // while loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-pink-200">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white px-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/10">
        {/* Header */}
        <AuthHeader isLogin={isLogin} />

        {/* Form */}
        <AuthForm isLogin={isLogin} />

        {/* Toggle */}
        <div className="text-center mt-6 text-sm text-white/60">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-pink-300 hover:text-pink-400 underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-pink-300 hover:text-pink-400 underline"
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
