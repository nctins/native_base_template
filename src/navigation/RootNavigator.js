import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DrawerNavigation from "./Drawer";

const Stack = createNativeStackNavigator();

export const RootNavigator = function(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
                <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}