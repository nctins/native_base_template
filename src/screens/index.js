import React from "react";
import { LoginScreen } from "./LoginScreen";
import { StartScreen } from "./StartScreen";
import { SignUpScreen } from "./SignUpScreen";
import { RegisterSuccessScreen } from "./RegisterSuccessScreen";
import SettingScreen from "./SettingScreen";
// import VocabularyScreen from "./VocabularyScreen";

export const RootComponent = function(){
    return (
        <SettingScreen/>
    )
}