/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
        "colors": {
            "surface-container-lowest": "#ffffff",
            "inverse-surface": "#2f3131",
            "tertiary-fixed-dim": "#ffb3ac",
            "on-tertiary": "#ffffff",
            "primary": "#af2900",
            "primary-fixed-dim": "#ffb4a2",
            "on-error-container": "#93000a",
            "surface-container-high": "#e8e8e8",
            "on-secondary-fixed": "#002022",
            "on-secondary-fixed-variant": "#004f54",
            "error": "#ba1a1a",
            "on-tertiary-fixed": "#410003",
            "background": "#f9f9f9",
            "on-tertiary-container": "#fffbff",
            "on-surface": "#1a1c1c",
            "primary-container": "#d63c10",
            "surface-bright": "#f9f9f9",
            "surface-variant": "#e2e2e2",
            "on-tertiary-fixed-variant": "#930010",
            "surface-container": "#edeeed",
            "tertiary": "#b6171e",
            "secondary-container": "#96f1fa",
            "on-primary-container": "#fffbff",
            "on-primary": "#ffffff",
            "outline-variant": "#e4beb5",
            "secondary-fixed": "#96f1fa",
            "outline": "#8f7068",
            "secondary-fixed-dim": "#7ad5dd",
            "on-secondary-container": "#006f77",
            "surface-container-low": "#f3f4f3",
            "primary-fixed": "#ffdbd2",
            "tertiary-fixed": "#ffdad6",
            "inverse-on-surface": "#f0f1f0",
            "on-surface-variant": "#5b403a",
            "secondary": "#006970",
            "on-background": "#1a1c1c",
            "surface-container-highest": "#e2e2e2",
            "on-secondary": "#ffffff",
            "surface": "#f9f9f9",
            "tertiary-container": "#da3433",
            "error-container": "#ffdad6",
            "on-primary-fixed-variant": "#891e00",
            "on-error": "#ffffff",
            "on-primary-fixed": "#3c0800",
            "surface-dim": "#d9dada",
            "inverse-primary": "#ffb4a2",
            "surface-tint": "#b32a00"
        },
        "borderRadius": {
            "DEFAULT": "0.125rem",
            "lg": "0.25rem",
            "xl": "0.5rem",
            "full": "0.75rem"
        },
        "fontFamily": {
            "headline": ["Manrope", "sans-serif"],
            "body": ["Inter", "sans-serif"],
            "label": ["Inter", "sans-serif"]
        }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
