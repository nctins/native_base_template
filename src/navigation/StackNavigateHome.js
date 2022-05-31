import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from "../screens/HomePage";
import AddVocabScreen from "../screens/AddVocabScreen";
import VocaDetail from "../screens/VocaDetail";
import Test from "../screens/Test";

const Stack = createNativeStackNavigator();

const StackNavigateHome = function(){
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomePage}/>
            <Stack.Screen name="AddVocabScreen" component={AddVocabScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Detail" component={VocaDetail} options={{headerShown: false}}/>
            <Stack.Screen name="Practice" component={Test} options={{headerShown: false}}/>
        </Stack.Navigator>
        
    )
}
export default StackNavigateHome;

// const StackNavigateHome = function(){
//     return (
//         <Stack.Navigator initialRouteName="HomeScreen">
//             <Stack.Screen name="HomeScreen" component={HomePage}/>
//             <Stack.Screen name="AddVocabScreen" component={() => {
//                 return <AddVocabScreen />;
//               }} options={{headerShown: false}}/>
//             <Stack.Screen name="Detail" component={VocaDetail} options={{headerShown: false}}/>
//             <Stack.Screen name="Practice" component={Test} options={{headerShown: false}}/>
//         </Stack.Navigator>
        
//     )
// }
// export default StackNavigateHome;