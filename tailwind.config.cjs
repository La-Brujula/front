/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,tsx,ts}"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: {
        DEFAULT: '#1BA7E3',
        light: '#D8E4F1'
      },
      secondary: {
        DEFAULT: '#2D7BBF',
        light: '#D6ECF8'
      },
      blue: {
        DEFAULT: '#262E5B',
        light: '#D8E4F1'
      },
      white: '#EDEDED',
      black: {
        DEFAULT: '#575756',
        light: '#EDEDED'
      }
    },
    fontFamily: {
      DEFAULT: [
        'Montserrat',
        'Roboto',
        '-apple-system',
        'SF-Regular',
        'BlinkMacSystemFont',
        'Arial',
        'sans-serif'
      ]
    },
  },
}
