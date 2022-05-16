import React, {useState} from 'react';
import {View, TextInput,Image, Switch ,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView } from 'react-native';
import IconSetting from 'react-native-vector-icons/MaterialIcons';
import IconMenu from 'react-native-vector-icons/Entypo';
import Typography from "../components/Typography";

const SettingScreen = () => {
    const [isAlertEnabled,setIsAlertEnabled] = useState(true);
    const toggleSwitch = () => setIsAlertEnabled(previousState => !previousState);

    const styles = {
        default : {
            flex: 1,
            backgroundColor: "#32A1B9"
        },
        headerView: {
            flex: 2,
            backgroundColor: "#32A1B9",
            paddingHorizontal: 20,
            paddingTop:30,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:"center"
        },
        mainView: {
            flex: 10,
            backgroundColor: "#DBD9D4",
            paddingBottom: 80
        },
        componentMainView:{
            flex:1,
            backgroundColor:"white"
        },
        tinyLogo:{
            width: 60,
            height: 60,
            borderWidth:1,
            borderColor:"grey",
            borderRadius:10
        },
        lineStyle:{
            flex:1,
            alignItems:"center",
            justifyContent: "space-between",
            flexDirection:"row",
            paddingHorizontal:15
        },
        textInput:{
            width:60,
            backgroundColor: "#CCCCCC",
            borderRadius: 5,
            paddingHorizontal:20,
            justifyContent: "center",
            alignItems: "center",
            color: "black"
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1, width: "100%"}}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.default}>
            <View style={styles.headerView}>
                <IconMenu name='menu' size={40} style={{color:"white"}}/>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <Typography variant="title" style={{color:"white"}}> Cài đặt </Typography>
                    <IconSetting name='settings' size={40} style={{color:"white"}}></IconSetting>
                </View>
            </View>
            <View style={styles.mainView}>
                <View style={{flex:2, paddingTop:15}}>
                    <Typography variant="smallTitle" style={{color:"black",marginLeft:15}}>Tài khoản</Typography>
                    <View style={[styles.componentMainView,{minHeight:60, paddingHorizontal:15,alignItems:"center",flexDirection:"row"}]}>
                        <Image style={styles.tinyLogo} source={{url:"https://reactnative.dev/img/tiny_logo.png"}}></Image>
                        <View style={{marginLeft:15}}>
                            <Typography variant="smallTitle" style={{color:"black"}}>Minh Nguyễn</Typography>
                            <Typography variant="email" style={{color:"black"}}>minh@gmail.com</Typography>
                        </View>
                    </View>
                </View>
                <View style={{flex:2, paddingTop:15}}>
                    <Typography variant="smallTitle" style={{color:"black",marginLeft:15}}>Thông báo</Typography>
                    <View style={[styles.componentMainView]}>
                        <View style={[styles.lineStyle,{borderBottomWidth:1,borderColor:"#DBD9D4"}]}>
                            <Typography variant="mediumText" style={{color:"black"}}>Thông báo</Typography>
                            <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isAlertEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isAlertEnabled} />
                        </View>
                        <View style={[styles.lineStyle,{}]}>
                            <Typography variant="mediumText" style={{color:"black"}}>Thời gian gợi nhớ từ vựng</Typography>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <TextInput numberOfLines={1} defaultValue="15" style={styles.textInput}></TextInput>
                                <Typography variant="mediumText" style={{color:"black", marginLeft: 15}}>Minus</Typography>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex:2, paddingTop:15}}>
                    <Typography variant="smallTitle" style={{color:"black",marginLeft:15}}>Cộng đồng</Typography>
                    <View style={[styles.componentMainView]}>
                        <View style={[styles.lineStyle,{borderBottomWidth:1,borderColor:"#DBD9D4"}]}>
                            <Typography variant="mediumText" style={{color:"black"}}>Đánh giá ứng dụng</Typography>
                        </View>
                        <View style={[styles.lineStyle,{}]}>
                            <Typography variant="mediumText" style={{color:"black"}}>Chia sẽ</Typography>
                        </View>
                    </View>
                </View>
                <View style={{flex:3, paddingTop:15}}>
                    <Typography variant="smallTitle" style={{color:"black",marginLeft:15}}>Thông tin</Typography>
                    <View style={[styles.componentMainView]}>
                        <View style={[styles.lineStyle,{borderBottomWidth:1,borderColor:"#DBD9D4"}]}>
                            <Typography variant="mediumText" style={{color:"black"}}>FAQ</Typography>
                        </View>
                        <View style={[styles.lineStyle,{borderBottomWidth:1,borderColor:"#DBD9D4"}]}>
                            <Typography variant="mediumText" style={{color:"black"}}>Phản hồi</Typography>
                        </View>
                        <View style={[styles.lineStyle,{}]}>
                            <Typography variant="mediumText" style={{color:"black"}}>Phiên bản</Typography>
                            <Typography variant="email" style={{color:"grey"}}>V123.6</Typography>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
export default SettingScreen