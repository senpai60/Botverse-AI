import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { botApi } from "../api/botApi";

const CreateBotPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    gender: "",
    category: "",
    description: "",
    tone: "",
    purpose: "",
    primaryTraits: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        primaryTraits: formData.primaryTraits
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        createdBy: user?.username,
      };

      await botApi.post("/create", payload);

      setMessage("✨ Bot created successfully!");
      setFormData({
        name: "",
        alias: "",
        gender: "",
        category: "",
        description: "",
        tone: "",
        purpose: "",
        primaryTraits: "",
      });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to create bot. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white flex flex-col items-center p-10">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-pink-300">
          Create Your Virtual Bot 🤖
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-pink-300 hover:text-pink-400 transition"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl grid lg:grid-cols-3 gap-8 animate-fadeIn">
        {/* Left Column */}
<div className="col-span-1 space-y-5">
  <div>
    <label className="block text-sm text-pink-200 mb-1">Name *</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      placeholder="e.g. Luna, Kai..."
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-pink-400 focus:outline-none backdrop-blur-md"
    />
  </div>

  <div>
    <label className="block text-sm text-pink-200 mb-1">Alias</label>
    <input
      type="text"
      name="alias"
      value={formData.alias}
      onChange={handleChange}
      placeholder="Optional nickname"
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-pink-400 focus:outline-none backdrop-blur-md"
    />
  </div>

  <div>
    <label className="block text-sm text-pink-200 mb-1">Gender</label>
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-pink-400 focus:outline-none appearance-none backdrop-blur-md"
    >
      <option className="bg-purple-800 text-white" value="">
        Select...
      </option>
      <option className="bg-purple-800 text-white" value="female">
        Female
      </option>
      <option className="bg-purple-800 text-white" value="male">
        Male
      </option>
      <option className="bg-purple-800 text-white" value="non-binary">
        Non-binary
      </option>
      <option className="bg-purple-800 text-white" value="custom">
        Custom
      </option>
    </select>
  </div>
</div>

{/* Middle Column */}
<div className="col-span-1 space-y-5">
  <div>
    <label className="block text-sm text-pink-200 mb-1">Category *</label>
    <select
      name="category"
      value={formData.category}
      onChange={handleChange}
      required
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-pink-400 focus:outline-none appearance-none backdrop-blur-md"
    >
      <option className="bg-purple-800 text-white" value="">
        Select...
      </option>
      <option className="bg-purple-800 text-white" value="romantic">
        Romantic
      </option>
      <option className="bg-purple-800 text-white" value="friendly">
        Friendly
      </option>
      <option className="bg-purple-800 text-white" value="assistant">
        Assistant
      </option>
      <option className="bg-purple-800 text-white" value="funny">
        Funny
      </option>
      <option className="bg-purple-800 text-white" value="mentor">
        Mentor
      </option>
    </select>
  </div>

  <div>
    <label className="block text-sm text-pink-200 mb-1">Tone</label>
    <select
      name="tone"
      value={formData.tone}
      onChange={handleChange}
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-pink-400 focus:outline-none appearance-none backdrop-blur-md"
    >
      <option className="bg-purple-800 text-white" value="">
        Select...
      </option>
      <option className="bg-purple-800 text-white" value="soft">
        Soft
      </option>
      <option className="bg-purple-800 text-white" value="flirty">
        Flirty
      </option>
      <option className="bg-purple-800 text-white" value="sarcastic">
        Sarcastic
      </option>
      <option className="bg-purple-800 text-white" value="calm">
        Calm
      </option>
      <option className="bg-purple-800 text-white" value="supportive">
        Supportive
      </option>
    </select>
  </div>

  <div>
    <label className="block text-sm text-pink-200 mb-1">Purpose</label>
    <input
      type="text"
      name="purpose"
      value={formData.purpose}
      onChange={handleChange}
      placeholder="What is this bot for?"
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-pink-400 focus:outline-none backdrop-blur-md"
    />
  </div>
</div>

{/* Right Column */}
<div className="col-span-1 space-y-5">
  <div>
    <label className="block text-sm text-pink-200 mb-1">Description</label>
    <textarea
      name="description"
      rows="3"
      value={formData.description}
      onChange={handleChange}
      placeholder="Describe your bot’s personality..."
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none backdrop-blur-md"
    ></textarea>
  </div>

  <div>
    <label className="block text-sm text-pink-200 mb-1">
      Primary Traits (comma separated)
    </label>
    <input
      type="text"
      name="primaryTraits"
      value={formData.primaryTraits}
      onChange={handleChange}
      placeholder="e.g. caring, witty, confident..."
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-pink-400 focus:outline-none backdrop-blur-md"
    />
  </div>
</div>


        {/* Submit Button */}
        <div className="col-span-3 flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="px-10 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold hover:brightness-110 transition"
          >
            {loading ? "Creating..." : "✨ Create Bot"}
          </button>
        </div>

        {/* Feedback */}
        {message && (
          <p className="col-span-3 text-center mt-2 text-sm text-pink-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateBotPage;
