/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,jsx,tsx,ts}'],
  theme: {
    fontFamily: {
      DEFAULT: [
        'Montserrat',
        'Roboto',
        '-apple-system',
        'SF-Regular',
        'BlinkMacSystemFont',
        'Arial',
        'sans-serif',
      ],
    },
    extend: {
      minHeight: {
        footerAware: 'calc(100dvh - 17rem)',
      },
      height: {
        footerAware: 'calc(100dvh - 17rem)',
      },
      colors: {
        transparent: 'transparent',
        primary: '#2D7BBF',
        secondary: '#1BA7E3',
        blue: '#25305D',
        white: '#EDEDED',
        black: '#575756',
      },
      animation: {
        'slide-left': 'slide-left .2s cubic-bezier(0, 0, 0.2, 1) linear',
      },
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
};
