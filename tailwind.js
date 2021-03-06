module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      'sans': ["'Montserrat'"],
      'serif': ["'Montserrat'"],
      'mono': ["'Montserrat'"],
      'heading': ["'Montserrat'"],
      'body': ["'Hind'"],
    },
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '44rem',
      }
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    visibility: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  corePlugins: {
    fontFamily: false,
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/ui')({
      layout: 'sidebar',
    }),
  ]
}