import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from "@expo/vector-icons";

import HomePage from "./HomePage";
import SettingScreen from "./SettingScreen";
import FavoriteScreen from "./FavoriteScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = function(){
    return (
        <Drawer.Navigator detachInactiveScreens="HomePage">
            <Drawer.Screen name="HomePage" component={HomePage} options={{title:"Trang chủ",drawerIcon: () => <MaterialIcons name="home" size={24} />}}/>
            <Drawer.Screen name="FavoriteScreen" component={FavoriteScreen} options={{title:"Yêu thích",drawerIcon: () => <MaterialIcons name="favorite-outline" size={24} />}}/>
            <Drawer.Screen name="SettingScreen" component={SettingScreen} options={{title:"Cài đặt",drawerIcon: () => <MaterialIcons name="settings" size={24} />}}/>
        </Drawer.Navigator>
    )
}
export default DrawerNavigation;