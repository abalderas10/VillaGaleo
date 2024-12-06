/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        caribbean: {
          50: '#f0fdff',
          100: '#e0fafe',
          200: '#baf1fa',
          300: '#7de3f3',
          400: '#36cee7',
          500: '#1ab3cf',
          600: '#0891ae',
          700: '#0a748d',
          800: '#0d5f74',
          900: '#124f62',
        },
        sand: {
          50: '#fdfaf5',
          100: '#faf1e6',
          200: '#f3e1c7',
          300: '#e8c9a0',
          400: '#dba97',
          500: '#c69162',
          600: '#b17849',
          700: '#95613d',
          800: '#7c5137',
          900: '#674431',
        },
        coral: {
          50: '#fff1f0',
          100: '#ffe4e1',
          200: '#ffc9c2',
          300: '#ffa198',
          400: '#ff6b5b',
          500: '#ff3d2e',
          600: '#ed1c0c',
          700: '#c51509',
          800: '#a3150d',
          900: '#871712',
        }
      },
      backgroundImage: {
        'shell-pattern': "url('/images/patterns/shell-pattern.svg')",
        'wave-pattern': "url('/images/patterns/wave-pattern.svg')",
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      typography: (theme) => ({
        caribbean: {
          css: {
            '--tw-prose-body': theme('colors.caribbean.700'),
            '--tw-prose-headings': theme('colors.caribbean.900'),
            '--tw-prose-links': theme('colors.caribbean.500'),
            '--tw-prose-bold': theme('colors.caribbean.900'),
            '--tw-prose-quotes': theme('colors.caribbean.700'),
            '--tw-prose-quote-borders': theme('colors.caribbean.300'),
            '--tw-prose-counters': theme('colors.caribbean.500'),
            '--tw-prose-bullets': theme('colors.caribbean.500'),
            '--tw-prose-hr': theme('colors.caribbean.200'),
            '--tw-prose-th-borders': theme('colors.caribbean.300'),
            '--tw-prose-td-borders': theme('colors.caribbean.200'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};