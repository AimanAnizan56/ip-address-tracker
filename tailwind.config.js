/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: '375px',
        desktop: '1440px',
      },
      colors: {
        'dark-gray': 'hsl(var(--color-dark-gray)/<alpha-value>)',
        'very-dark-gray': 'hsl(var(--color-very-dark-gray)/<alpha-value>)',
      },
    },
  },
  plugins: [],
};
