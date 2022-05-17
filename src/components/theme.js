const color = {
  Blue: "rgba(50, 161, 185, 1)",
  LightBlue: "rgba(237, 243, 237, 0.89)",
  LightBlue2: "rgb(229, 229, 229)",
  Yellow: "rgba(233, 181, 47, 1)",
  darkYellow: "rgba(133, 122, 94, 1)",
  White: "rgba(255, 255, 255, 1)",
  Black: "rgba(57, 57, 57, 1)",
  LightRed: "rgba(247, 56, 89, 1)",
  LightGreen: "rgba(77, 241, 50, 1)",
  LightGray: "rgba(124, 124, 122, 1)",
  Gray: "rgba(196, 196, 196, 1)",
  GreenEdit: "rgba(34, 199, 169, 1)"
};

const shadows = {
  1: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: "#40000000",
  },
  2: {
    shadowOffset: {
      width: 11,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowColor: "#40000000",
  },
  none: {
    shadowColor: "transparent",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

export const theme = {
  colors: {
    primary: {
      1: color.Blue,
      2: color.LightBlue,
      3: color.LightBlue2,
      4: color.White,
    },
    secondary: {
      1: color.Gray,
      2: color.LightGray,
      3: color.White,
    },
    text: {
      dark: color.Black,
      light: color.White,
      gray: color.Gray,
      lightGray: color.LightGray,
    },
    success: color.LightGreen,
    danger: color.LightRed,
    edit: color.GreenEdit,
    warning: {
      1: color.Yellow,
      2: color.darkYellow,
    },
  },
  shadows: shadows,
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
};
