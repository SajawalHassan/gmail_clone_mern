/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        header: "#F6F8FC",
        search: "#EAF1FB",
        "icon-hover": "#E7EAED",
        "menu-option": "#EEEEEE",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              "ul > li.task-list-item::before": {
                content: "none",
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
