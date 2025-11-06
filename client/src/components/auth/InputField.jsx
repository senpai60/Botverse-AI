const InputField = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-pink-200 font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  );
};

export default InputField;
