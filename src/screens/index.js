import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from "./StartScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import HomePage from "./HomePage";
import SettingScreen from "./SettingScreen";
import DrawerNavigation from "./Drawer";

const Stack = createNativeStackNavigator();

export const RootComponent = function(){
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