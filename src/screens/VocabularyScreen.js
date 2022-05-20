import React from "react";
import {View, TextInput,Pressable ,TouchableWithoutFeedback,Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconA from 'react-native-vector-icons/FontAwesome';
import Typography from "../components/Typography";
import MeansOfVocabulary from "../components/MeansOfVocabulary";

const VocabularyScreen = () => {
    const styles = {
        default : {
            flex: 1,
            backgroundColor: "#EDF3ED"
        },
        mainView: {
            paddingTop: 60,
            paddingHorizontal: 15
        },
        componentViewCenter: {
            backgroundColor: "#ffffff",
            borderRadius: 10,
            flexDirection:"row",
            alignItems:"center" ,
            justifyContent:"center"
        },
        componentViewLeft: {
            backgroundColor: "#ffffff",
            borderRadius: 10,
        },
        viewTitle:{
            width:"100%",
            height: 35,
            flexDirection:"row",
            justifyContent:"space-between",
            marginTop:5,
            borderBottomWidth: 1
        },
        textArea:{
            width: "95%",
            borderWidth:1,
            textAlignVertical: 'top',
            maxHeight:90,
            borderRadius:7,
            borderColor: "#E9B52F",
            paddingVertical: 5,
            paddingHorizontal: 10,
        },
        buttonConfig:{
            marginTop:15,
            width:"40%",
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 7,
            elevation: 3,
            backgroundColor: '#22C7A9',
        }
    }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.default}>
        <View style={styles.mainView}>
            <Icon name="arrowleft" size={30}></Icon>
            <View style={[styles.componentViewCenter,{marginTop:15,minHeight:50}]}>
                <Typography variant="smallTitle" style={{color:"black"}}>Từ vựng: </Typography>
                <TextInput numberOfLines={1} style={{width:180,borderColor:"black",borderWidth:1,marginLeft:10,paddingHorizontal:5}}> </TextInput>
            </View>
            <View style={[styles.componentViewLeft,{marginTop:15,minHeight:80,zIndex:1}]}>
                <View style={styles.viewTitle}>
                    <Typography variant="smallTitle" style={{color:"black",marginLeft:10}}>Nghĩa của từ </Typography>
                    <Icon name="pluscircle" size={30} style={{marginRight:10}}></Icon>
                </View>
                <View style={{width:"100%", paddingHorizontal:20,paddingBottom:10, zIndex:1}}>
                    <MeansOfVocabulary zIndex = {3} />
                    <MeansOfVocabulary zIndex = {2} />
                </View>
            </View>
            <View style={[styles.componentViewLeft,{marginTop:15}]}>
                <View style={styles.viewTitle}>
                    <Typography variant="smallTitle" style={{color:"black",marginLeft:10}}>Ảnh minh hoạ</Typography>
                </View>
                <View style={{width:"100%",minHeight:60,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <TextInput editable={false} numberOfLines={1} style={{width:"80%",height:30,borderWidth:1}} ></TextInput>
                    <IconA name="image" size={37} style={{color:"blue"}}></IconA>
                </View>
            </View>
            <View style={[styles.componentViewLeft,{marginTop:15}]}>
                <View style={styles.viewTitle}>
                    <Typography variant="smallTitle" style={{color:"black",marginLeft:10}}>Ghi chú</Typography>
                </View>
                <View style={{width:"100%",height:110,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
                    <TextInput multiline={true} numberOfLines={5} style={styles.textArea}></TextInput>
                </View>
            </View>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"center"}}>
                <Pressable style={styles.buttonConfig} >
                    <Typography variant="text">Thêm</Typography>
                </Pressable>
            </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
export default VocabularyScreen