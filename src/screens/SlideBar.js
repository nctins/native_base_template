import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IconMenu from 'react-native-vector-icons/Entypo';
import VocabularyScreen from './VocabularyScreen';
import SettingScreen from './SettingScreen';

const Drawer = createDrawerNavigator();

const headerOptions = {
    title: "Cài đặt",
    drawerIcon: ({ focused, size, color }) => <IconMenu name="menu" size={24} />,
    headerStyle: {
        backgroundColor: "#32A1B9",
        height:200
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 30
    }
  };

const SlideBar = () => {
    return (
        <Drawer.Navigator
            useLegacyImplementation
            initialRouteName="SettingScreen"
        >
            <Drawer.Screen 
                name="VocabularyScreen" 
                component={VocabularyScreen} 
                options={{title: "Thêm từ vựng"}} />
            <Drawer.Screen 
                name="SettingScreen" 
                component={SettingScreen}
                options={headerOptions}/>
        </Drawer.Navigator>
    );
}
export default SlideBar