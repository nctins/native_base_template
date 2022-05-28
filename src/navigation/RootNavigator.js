import React, { useContext, useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import  * as SecureStore from "expo-secure-store";

import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import RegisterSuccessScreen from "../screens/RegisterSuccessScreen";
import DrawerNavigation from "./Drawer";
import { AuthContext } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export const RootNavigator = function () {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState("loading");
  const [initScreen, setInitScreen] = useState("StartScreen")
  const loadJWT = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const { accessToken, refreshToken } = JSON.parse(token);

      authContext.setAuthState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        authenticated: true,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);
  useEffect(() => {
    loadJWT();
  }, []);

  if (status === "loading") {
    console.log("app loading")
    return <AppLoading />;
  }

  if(authContext?.AuthState?.authenticated === true){
      setInitScreen("DrawerNavigation")
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initScreen}>
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterSuccessScreen"
          component={RegisterSuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
