/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // Add a breakpoint for extra-large screens
        '2xl': '1536px',
      },
      colors: {
        // Define custom colors
        primary: '#1E40AF', // Blue-700
        secondary: '#10B981', // Green-500
        lightGray: '#F3F4F6', // Neutral-100
      },
      spacing: {
        // Custom spacing values
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        // Custom border radius
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [
    // Add useful plugins
    //require('@tailwindcss/forms'), // For better form styling
    //require('@tailwindcss/typography'), // For rich text styling
    require('tailwind-scrollbar-hide'), // To hide scrollbars
    //require('@tailwindcss/aspect-ratio'), // For aspect ratios
  ],
};
