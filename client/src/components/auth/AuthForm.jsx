import { useState } from "react";
import InputField from "./InputField";
import { useAuthContext } from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'

const AuthForm = ({ isLogin }) => {
  const { login, signup, loading } = useAuthContext();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isLogin) {
      await login(formData.email, formData.password);
    } else {
      await signup(formData.username, formData.email, formData.password);
    }
    navigate("/"); // ✅ move this outside
  } catch (err) {
    console.error(err);
    alert(err);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full animate-fadeIn">
      {!isLogin && (
        <InputField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
      )}

      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />

      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold hover:brightness-110 transition"
      >
        {isLogin ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
