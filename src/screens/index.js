import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import SlideBar from "./SlideBar";

export const RootComponent = function(){
    return (
        <NavigationContainer>
            <SlideBar />
        </NavigationContainer>
    )
}