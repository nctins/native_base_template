import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LogoutScreen = ({navigation}) => {
    const authContext = useContext(AuthContext);
    authContext.logout();

    return <>{navigation.navigate("LoginScreen",{
        userName: "",
        passWord: "",
    })}</>;
}
export default LogoutScreen;