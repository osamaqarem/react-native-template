
const palette = {
  colors: {
    red: "#D52031",
    lightBlue: "#15AAE1",
    darkBlue: "#10529F",
    green: "#01CE7F",
    black: "#000000",
    lightBlack: "#1D2226",
    grey: "#999999",
    darkGrey: "#666666",
    lightGrey: "#E2E2E2",
    white: "#FFFFFF",
    darkWhite: "#F3F4F9",
  },
  fonts: {
    montserrat: {
      regular: 'montserrat_regular',
      medium: 'montserrat_medium',
      bold: 'montserrat_bold',
    },
    firasans: {
      regular: 'firasans_regular',
      medium: 'firasans_medium',
      bold: 'firasans_bold',
    },
  }
}


export const theme = {
  primaryDark: palette.colors.lightBlack,
  primary: palette.colors.red,
  text: palette.colors.black,
  typography: {
    header: {
      fontSize: 20,
      fontFamily: palette.fonts.montserrat.bold
    },
    subheader: {
      fontSize: 18,
      fontFamily: palette.fonts.firasans.medium
    },
    body: {
      fontSize: 14,
      fontFamily: palette.fonts.firasans.regular
    },
  }
}