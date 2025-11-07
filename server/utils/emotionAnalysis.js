// utils/emotionAnalysis.js
export function detectEmotion(text) {
  const t = text.toLowerCase();
  if (/(sad|upset|cry|hurt|bad)/.test(t)) return "negative";
  if (/(happy|great|love|nice|awesome|fun)/.test(t)) return "positive";
  return "neutral";
}
