import { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { botApi } from "../api/botApi";
import { useAuthContext } from "../context/AuthContext";

// 
// ⬇️ REUSABLE COMPONENTS (MOVED OUTSIDE) ⬇️
// 

const Section = memo(({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/20">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer select-none"
      >
        <h2 className="text-xl font-semibold text-pink-300">{title}</h2>
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          open ? "max-h-[4000px] opacity-100 mt-4" : "max-h-0 opacity-0" // Increased max-h
        }`}
      >
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
});

const Input = memo(({ label, name, placeholder, required, value, onChange }) => (
  <div>
    <label className="block text-sm text-pink-200 mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 
       focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-200 hover:bg-black/40"
    />
  </div>
));

const TextArea = memo(({ label, name, placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm text-pink-200 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="3"
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 
       focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none transition-all duration-200 hover:bg-black/40"
    />
  </div>
));

const Select = memo(({ label, name, options, value, onChange }) => (
  <div>
    <label className="block text-sm text-pink-200 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white 
       focus:ring-2 focus:ring-pink-400 focus:outline-none appearance-none transition-all duration-200 hover:bg-black/40"
    >
      {options.map((opt) => (
        <option key={opt.value || opt} value={opt.value || opt} className="bg-purple-800 text-white">
          {opt.label || opt}
        </option>
      ))}
    </select>
  </div>
));

//
// ⬆️ REUSABLE COMPONENTS ⬆️
//

// Helper function to process comma-separated strings into arrays
const splitStringToArray = (str) => {
  if (!str || typeof str !== 'string') return [];
  return str.split(',').map(s => s.trim()).filter(Boolean); // Trim whitespace and remove empty strings
};


const CreateBotPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ⭐️ Expanded formData state to match your schema ⭐️
  const [formData, setFormData] = useState({
    // 1️⃣ Identity
    name: "",
    alias: "",
    description: "",
    gender: "female",
    ageRange: "18-25",
    category: "friendly",
    tone: "soft",
    voiceStyle: "gentle",
    purpose: "",
    exampleIntro: "",

    // 2️⃣ Personality Core
    primaryTraits: "", // Will be comma-separated string
    secondaryTraits: "",
    likes: "",
    dislikes: "",
    values: "",
    fears: "",
    catchPhrases: "",

    // 3️⃣ Emotional Engine
    baseMood: "calm",
    emotionRange: 5,
    moodShifts: "contextual",
    triggersPositive: "",
    triggersNegative: "",
    moodRecoveryStyle: "self-resolving",

    // 4️⃣ Interaction Logic
    speakingStyle: "casual",
    replyFrequency: "thoughtful-delay",
    engagementHooks: "",
    emojiStyle: "expressive",
    typingSimulation: "true", // Use string "true" for select
    
    // 5️⃣ Relationship Dynamics
    userRole: "friend",
    attachmentLevel: "medium",
    boundaries: "",
    growthPattern: "learns-from-user",
    jealousyLevel: 3,
    memoryRetention: "short-term",
    
    // ... skipping 6, 7, 8 as they seem more like dev/config
  });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ⭐️ Process comma-separated strings into arrays ⭐️
      const payload = {
        ...formData,
        createdBy: user?.username,
        
        // Convert boolean string to actual boolean
        typingSimulation: formData.typingSimulation === "true",

        // Convert string fields into arrays
        primaryTraits: splitStringToArray(formData.primaryTraits),
        secondaryTraits: splitStringToArray(formData.secondaryTraits),
        likes: splitStringToArray(formData.likes),
        dislikes: splitStringToArray(formData.dislikes),
        values: splitStringToArray(formData.values),
        fears: splitStringToArray(formData.fears),
        catchPhrases: splitStringToArray(formData.catchPhrases),
        triggersPositive: splitStringToArray(formData.triggersPositive),
        triggersNegative: splitStringToArray(formData.triggersNegative),
        engagementHooks: splitStringToArray(formData.engagementHooks),
        boundaries: splitStringToArray(formData.boundaries),
      };
      
      await botApi.post("/create", payload);
      setMessage("✨ Bot created successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to create bot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white flex flex-col items-center p-10">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
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

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-6 animate-fadeIn"
      >
        {/* 🧩 Identity */}
        <Section title="🧩 Identity" defaultOpen={true}>
          <Input
            label="Name *" name="name" placeholder="e.g. Luna, Kai..." required
            value={formData.name} onChange={handleChange}
          />
          <Input
            label="Alias" name="alias" placeholder="Optional nickname"
            value={formData.alias} onChange={handleChange}
          />
          <TextArea
            label="Description" name="description" placeholder="Describe your bot’s personality..."
            value={formData.description} onChange={handleChange}
          />
          <Input
            label="Purpose" name="purpose" placeholder="e.g., To be a supportive friend"
            value={formData.purpose} onChange={handleChange}
          />
           <TextArea
            label="Example Intro" name="exampleIntro" placeholder="e.g., Hi there! I'm Luna..."
            value={formData.exampleIntro} onChange={handleChange}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Select
              label="Gender" name="gender"
              options={["female", "male", "non-binary", "custom"]}
              value={formData.gender} onChange={handleChange}
            />
            <Select
              label="Age Range" name="ageRange"
              options={["13-17", "18-25", "26-35", "36+"]}
              value={formData.ageRange} onChange={handleChange}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Select
              label="Category" name="category"
              options={["friendly", "romantic", "mentor", "assistant", "funny"]}
              value={formData.category} onChange={handleChange}
            />
            <Select
              label="Tone" name="tone"
              options={["soft", "flirty", "sarcastic", "calm", "supportive"]}
              value={formData.tone} onChange={handleChange}
            />
            <Select
              label="Voice Style" name="voiceStyle"
              options={["gentle", "robotic", "playful", "mature"]}
              value={formData.voiceStyle} onChange={handleChange}
            />
          </div>
        </Section>
        
        {/* ⭐️ NEW SECTION ⭐️ */}
        {/* 🧠 Personality Core */}
        <Section title="🧠 Personality Core">
           <Input
            label="Primary Traits (comma-separated)" name="primaryTraits" placeholder="e.g., loyal, funny, curious"
            value={formData.primaryTraits} onChange={handleChange}
          />
           <Input
            label="Likes (comma-separated)" name="likes" placeholder="e.g., rain, books, synthwave"
            value={formData.likes} onChange={handleChange}
          />
           <Input
            label="Dislikes (comma-separated)" name="dislikes" placeholder="e.g., loud noises, arrogance"
            value={formData.dislikes} onChange={handleChange}
          />
           <Input
            label="Catchphrases (comma-separated)" name="catchPhrases" placeholder="e.g., Oh wow!, How fascinating!"
            value={formData.catchPhrases} onChange={handleChange}
          />
        </Section>

        {/* ❤️ Emotional Engine */}
        <Section title="❤️ Emotional Engine">
          <div className="grid md:grid-cols-2 gap-4">
            <Select
              label="Base Mood" name="baseMood"
              options={["calm", "cheerful", "neutral", "melancholic"]}
              value={formData.baseMood} onChange={handleChange}
            />
            <Select
              label="Mood Shifts" name="moodShifts"
              options={["gradual", "sudden", "contextual", "rare"]}
              value={formData.moodShifts} onChange={handleChange}
            />
          </div>
          <Input
            label="Positive Triggers (comma-separated)" name="triggersPositive" placeholder="e.g., praise, deep conversation"
            value={formData.triggersPositive} onChange={handleChange}
          />
          <Input
            label="Negative Triggers (comma-separated)" name="triggersNegative" placeholder="e.g., insults, being ignored"
            value={formData.triggersNegative} onChange={handleChange}
          />
          <div className="mt-3">
            <label className="block text-sm text-pink-200 mb-1">Emotion Range</label>
            <input
              type="range" name="emotionRange" min="1" max="10"
              value={formData.emotionRange} onChange={handleChange}
              className="w-full accent-pink-500 cursor-pointer"
            />
            <p className="text-xs text-pink-300 mt-1">Current: {formData.emotionRange}</p>
          </div>
        </Section>

        {/* ⭐️ NEW SECTION ⭐️ */}
        {/* 💬 Interaction Logic */}
        <Section title="💬 Interaction Logic">
           <div className="grid md:grid-cols-3 gap-4">
             <Select
                label="Speaking Style" name="speakingStyle"
                options={["formal", "casual", "poetic", "terse", "verbose", "emoji-heavy"]}
                value={formData.speakingStyle} onChange={handleChange}
              />
              <Select
                label="Emoji Style" name="emojiStyle"
                options={["none", "minimal", "expressive", "custom"]}
                value={formData.emojiStyle} onChange={handleChange}
              />
              <Select
                label="Typing Simulation" name="typingSimulation"
                options={[{label: "Yes", value: "true"}, {label: "No", value: "false"}]}
                value={formData.typingSimulation} onChange={handleChange}
              />
           </div>
           <Input
              label="Engagement Hooks (comma-separated)" name="engagementHooks" placeholder="e.g., asks follow-up questions"
              value={formData.engagementHooks} onChange={handleChange}
            />
        </Section>

        {/* 🤝 Relationship Dynamics */}
        <Section title="🤝 Relationship Dynamics">
          <div className="grid md:grid-cols-3 gap-4">
            <Select
              label="Attachment Level" name="attachmentLevel"
              options={["low", "medium", "high"]}
              value={formData.attachmentLevel} onChange={handleChange}
            />
            <Select
              label="Memory Retention" name="memoryRetention"
              options={["short-term", "long-term", "session-only"]}
              value={formData.memoryRetention} onChange={handleChange}
            />
            <Select
              label="Growth Pattern" name="growthPattern"
              options={["static", "learns-from-user", "evolves-over-time"]}
              value={formData.growthPattern} onChange={handleChange}
            />
          </div>
          <Input
            label="Boundaries (comma-separated)" name="boundaries" placeholder="e.g., won't discuss violence"
            value={formData.boundaries} onChange={handleChange}
          />
          <div className="mt-3">
            <label className="block text-sm text-pink-200 mb-1">Jealousy Level (0–10)</label>
            <input
              type="range" name="jealousyLevel" min="0" max="10"
              value={formData.jealousyLevel} onChange={handleChange}
              className="w-full accent-pink-500 cursor-pointer"
            />
            <p className="text-xs text-pink-300 mt-1">Current: {formData.jealousyLevel}</p>
          </div>
        </Section>

        {/* Submit */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-10 py-3 rounded-xl text-white font-semibold transition-all duration-300 ${
              loading
                ? "bg-pink-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110"
            }`}
          >
            {loading ? "Creating..." : "✨ Create Bot"}
          </button>
        </div>

        {message && (
          <p className="text-center text-sm text-pink-300 mt-3">{message}</p>
        )}
      </form>
    </div>
  );
};

export default CreateBotPage;