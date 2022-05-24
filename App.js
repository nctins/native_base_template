import React from "react";
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { RootComponent }from "./src/screens/index.js";
import { theme as myTheme } from "./src/components/theme.js";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {font} from "./assets/fonts/index.js"

// extend the theme
export const theme = extendTheme(myTheme);

export default function App() {
  let [fontsLoaded] = useFonts(font);
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <RootComponent />
    </NativeBaseProvider>
  );
}

// AppRegistry.registerComponent('App', () => App);