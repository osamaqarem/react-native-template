
const palette = {
  colors: {
    black: "#222",
    white: "#fff",
  },
  fonts: {
    // For example only. 
    // Fonts must be linked to be used

    // montserrat: {
    //   regular: 'montserrat_regular',
    //   medium: 'montserrat_medium',
    //   bold: 'montserrat_bold',
    // },
    // firasans: {
    //   regular: 'firasans_regular',
    //   medium: 'firasans_medium',
    //   bold: 'firasans_bold',
    // },
  }
}


export const theme = {
  background: palette.colors.white,
  text: palette.colors.black,
  typography: {
    header: {
      fontSize: 20,
      // fontFamily: palette.fonts.montserrat.bold
    },
    subheader: {
      fontSize: 18,
      // fontFamily: palette.fonts.firasans.medium
    },
    body: {
      fontSize: 14,
      // fontFamily: palette.fonts.firasans.regular
    },
  }
}