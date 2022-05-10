import React from "react";
import { Text } from "native-base";

const typography = {
  text: {
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 30,
    textAlignVertical: "top",
  },
  buttonText: {
    fontFamily: "Outfit-SemiBold",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 28,
    textAlignVertical: "top",
  },
  smallText: {
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 20,
    textAlignVertical: "top",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    fontSize: 32,
    lineHeight: 45,
    textAlignVertical: "top",
  },
  smallTitle: {
    fontFamily: "OpenSans-Bold",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 27,
    textAlignVertical: "top",
  },
  username: {
    fontFamily: "OpenSans-Bold",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: "top",
  },
  email: {
    fontFamily: "OpenSans-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    textAlignVertical: "top",
  },
  logo: {
    fontFamily: "Poppins-ExtraBold",
    fontWeight: "800",
    fontSize: 48,
    lineHeight: 72,
    textAlignVertical: "top",
  },
};

const Typography = (props)=>{
  const {variant, style, ...otherProps} = props;
  const textStyle = variant ? typography[variant] : typography.text;
  return (
    <Text style={[textStyle, style]} {...otherProps} ></Text>
  )
}

export default Typography
