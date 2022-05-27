import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from "@expo/vector-icons";

import HomePage from "../screens/HomePage";
import VocabularyScreen from "../screens/VocabularyScreen";
import VocaDetail from "../screens/VocaDetail";
import Test from "../screens/Test";

const Stack = createNativeStackNavigator();

const StackNavigateHome = function(){
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomePage}/>
            <Stack.Screen name="AddVocabularyScreen" component={VocabularyScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Detail" component={VocaDetail} options={{headerShown: false}}/>
            <Stack.Screen name="Practice" component={Test} options={{headerShown: false}}/>
        </Stack.Navigator>
        
    )
}
export default StackNavigateHome;