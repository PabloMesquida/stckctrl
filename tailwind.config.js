module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geo: ['"Geo"', "sans-serif"],
      },
      padding: {
        21: "5.25rem",
        26: "6.5rem",
        68: "17rem",
      },
      minWidth: {
        "1/2": "50%",
      },
      height: {
        68: "17rem",
      },
      zIndex: {
        100: "100",
      },
      colors: {
        "th-background": "var(--background)",
        "th-background-secondary": "var(--background-secondary)",
        "th-background-tertiary": "var(--background-tertiary)",
        "th-background-title": "var(--background-title)",
        "th-primary-dark": "var(--primary-dark)",
        "th-primary-medium": "var(--primary-medium)",
        "th-primary-light": "var(--primary-light)",
        "th-accent-dark": "var(--accent-dark)",
        "th-accent-medium": "var(--accent-medium)",
        "th-accent-light": "var(--accent-light)",
        "th-error": "var(--error)",
        "th-warning": "var(--warning)",
        "th-success": "var(--success)",
      },
      plugins: [require("flowbite/plugin")],
    },
  },
};
