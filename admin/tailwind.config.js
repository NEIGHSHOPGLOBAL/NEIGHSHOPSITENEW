/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        charcoal: "var(--charcoal)",
        accent: { DEFAULT: "var(--accent)", soft: "var(--accent-soft)", 2: "var(--accent-2)" },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
      },
      borderRadius: {
        xs: "8px", sm: "12px", md: "16px", lg: "20px", xl: "28px", pill: "999px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: { tightest: "-0.03em" },
      boxShadow: {
        xs: "0 1px 2px rgba(17,17,17,.04)",
        sm: "0 2px 8px rgba(17,17,17,.05)",
        md: "0 12px 32px -8px rgba(17,17,17,.10)",
      },
    },
  },
  plugins: [],
}
