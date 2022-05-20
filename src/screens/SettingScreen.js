import React, {useState} from 'react';
import {View,ScrollView, TextInput,Image, Switch ,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView } from 'react-native';
import IconSetting from 'react-native-vector-icons/MaterialIcons';
import IconMenu from 'react-native-vector-icons/Entypo';
import Typography from "../components/Typography";

const SettingScreen = ({navigation}) => {
    const [isAlertEnabled,setIsAlertEnabled] = useState(true);
    const toggleSwitch = () => setIsAlertEnabled(previousState => !previousState);

    const styles = {
        mainView: {
            flex: 1,
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

    const headerRight = () => {
        return (
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", marginRight:15}}>
                <Typography variant="title" style={{color:"white"}}> Cài đặt </Typography>
                <IconSetting name='settings' size={40} style={{color:"white"}}></IconSetting>
            </View>
        )
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <IconMenu 
                name='menu' 
                size={40}
                color='white'
                style={{marginLeft:20}}
                onPress = {() => {
                    navigation.openDrawer();
                }}
            />
          ),
          headerRight: headerRight,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#32A1B9",
            height:150
        },
        });
      }, [navigation]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainView}>
                <ScrollView>
                <View style={{height:150, paddingTop:15,backgroundColor:"red"}}>
                    <Typography variant="smallTitle" style={{color:"black",marginLeft:15}}>Tài khoản</Typography>
                    <View style={[styles.componentMainView,{minHeight:60, paddingHorizontal:15,alignItems:"center",flexDirection:"row"}]}>
                        <Image style={styles.tinyLogo} source={{url:"https://reactnative.dev/img/tiny_logo.png"}}></Image>
                        <View style={{marginLeft:15}}>
                            <Typography variant="smallTitle" style={{color:"black"}}>Minh Nguyễn</Typography>
                            <Typography variant="email" style={{color:"black"}}>minh@gmail.com</Typography>
                        </View>
                    </View>
                </View>
                <View style={{height:120, paddingTop:15,backgroundColor:"blue"}}>
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
                <View style={{height:"30%", paddingTop:15}}>
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
                <View style={{height:"30%", paddingTop:15}}>
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
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default SettingScreen