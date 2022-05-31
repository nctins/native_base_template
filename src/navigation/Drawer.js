import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native"

// import HomePage from "./HomePage";
import StackNavigateHome from "./StackNavigateHome";
import SettingScreen from "../screens/SettingScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import StartScreen from "../screens/StartScreen";
import { AuthContext } from "../contexts/AuthContext";
import LogoutScreen from "../screens/Logout";

const Drawer = createDrawerNavigator();

const DrawerNavigation = function(){
    return (
        <Drawer.Navigator detachInactiveScreens="HomePage">
            <Drawer.Screen name="HomePage" component={StackNavigateHome} options={{title:"Trang chủ",drawerIcon: () => <MaterialIcons name="home" size={24} />,headerShown: false}}/>
            <Drawer.Screen name="FavoriteScreen" component={FavoriteScreen} options={{title:"Yêu thích",drawerIcon: () => <MaterialIcons name="favorite-outline" size={24} />}}/>
            <Drawer.Screen name="SettingScreen" component={SettingScreen} options={{title:"Cài đặt",drawerIcon: () => <MaterialIcons name="settings" size={24} />}}/>
            <Drawer.Screen name="LogoutScreen" component={LogoutScreen} options={{title:"Logout",drawerIcon: () => <MaterialIcons name="logout" size={24} />}}/>
        </Drawer.Navigator>
    )
}
export default DrawerNavigation;