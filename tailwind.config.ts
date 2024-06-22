import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        violet: {
          primary: '#5534DA',
          secondary: '#F1EFFD',
        },
        red: {
          primary: '#D6173A',
        },
        green: {
          primary: '#7AC555',
        },
        purple: {
          primary: '#760DDE',
        },
        orange: {
          primary: '#FFA500',
        },
        blue: {
          primary: '#76A5EA',
        },
        pink: {
          primary: '#E876EA',
        },
        gray: {
          100: '#FAFAFA',
          200: '#EEEEEE',
          300: '#D9D9D9',
          400: '#9FA6B2',
          500: '#787486',
          600: '#4B4B4B',
          700: '#333236',
          800: '#171717',
        },
      },
    },
  },
  plugins: [],
};
export default config;
