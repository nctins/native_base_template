import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./HomePage";
import VocabularyScreen from "./VocabularyScreen";
import VocaDetail from "./VocaDetail";
import Test from "./Test";

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