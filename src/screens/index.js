import React from "react";
import { LoginScreen } from "./LoginScreen";
import { StartScreen } from "./StartScreen";
import { SignUpScreen } from "./SignUpScreen";
import { RegisterSuccessScreen } from "./RegisterSuccessScreen";
import { VocaDetail } from "./VocaDetail";
import { Test } from "./Test";
import SettingScreen from "./SettingScreen";
import VocabularyScreen from "./VocabularyScreen";

export const RootComponent = function(){
    return (
        <SettingScreen/>
    )
}