export const moodThemes = {
  happy: {
    primary: "hsl(43, 96%, 56%)", // Warm yellow
    background: "hsl(44, 100%, 98%)",
    accent: "hsl(27, 96%, 61%)",
  },
  sad: {
    primary: "hsl(199, 89%, 48%)", // Calm blue
    background: "hsl(200, 100%, 98%)",
    accent: "hsl(199, 89%, 38%)",
  },
  anxious: {
    primary: "hsl(152, 76%, 40%)", // Soothing green
    background: "hsl(150, 100%, 98%)",
    accent: "hsl(152, 76%, 30%)",
  },
  neutral: {
    primary: "hsl(262, 83%, 58%)", // Default purple
    background: "hsl(260, 100%, 98%)",
    accent: "hsl(262, 83%, 48%)",
  },
};

export type MoodType = keyof typeof moodThemes;

export function setTheme(mood: MoodType) {
  const theme = moodThemes[mood];
  document.documentElement.style.setProperty("--primary", theme.primary);
  document.documentElement.style.setProperty("--background", theme.background);
  document.documentElement.style.setProperty("--accent", theme.accent);
}
