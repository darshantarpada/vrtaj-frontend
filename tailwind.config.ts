import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef9f0',
          100: '#fdf0d5',
          200: '#fbdfa5',
          300: '#f8c86a',
          400: '#f5aa35',
          500: '#f29313',
          600: '#e37309',
          700: '#bc540a',
          800: '#964210',
          900: '#7a3710',
          950: '#421a05',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
