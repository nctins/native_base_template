import React, { useState } from "react";
import {
    View,
    Center,
    StatusBar,
    VStack,
    Image,
    HStack,
    Button,
    IconButton,
    Checkbox
} from "native-base";
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Pressable,
    StyleSheet, 
    TouchableOpacity
} from "react-native";
import Typography from "../components/Typography";
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";

export const Test = () => {
    state={
        selectedLang:0
    };
    return (
        <View style={{flex: 1}} bg="primary.2">
            <View style={{flex: 0.4, flexDirection: 'row'}}>
                <View style={{flex: 0.1}}></View>

                <View style={{flex: 0.3}} >
                    <VStack
                        style={{ width: "100%", height: "100%" }}
                        space={4}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Icon name="chevron-left" size={20} color="rgba(102, 102, 102, 1)" />
                    </VStack>
                </View>

                <View style={{flex: 1.5}}>
                    <VStack
                        style={{ width: "100%", height: "100%" }}
                        space={4}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Typography variant="testStt" color="rgba(102, 102, 102, 1)">01/15</Typography>
                    </VStack>
                </View>

                <View style={{flex: 0.3}}>
                    <VStack
                        style={{ width: "100%", height: "100%" }}
                        space={4}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Icon name="navicon" size={20} color="rgba(102, 102, 102, 1)" />
                    </VStack>
                </View>
                
                <View style={{flex: 0.1}} ></View>
            </View>

            <View style={{flex: 0.4}} >
                <VStack
                    style={{ width: "100%", height: "100%" }}
                    space={4}
                    paddingLeft="5"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="vocalTextE" color="text.dark">Table (n)</Typography>
                </VStack>
            </View>
            
            <View style={{flex: 0.7}} >
                <VStack
                    style={{ width: "100%", height: "100%"}}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Image
                        source={require("../../assets/images/table.jpg")}
                    />
                </VStack>
            </View>

            <View style={{flex: 2}} >
                <VStack
                    style={{ width: "100%", height: "100%" }}
                    justifyContent="center"
                >
                    <CheckBox title="Cái bàn" checked></CheckBox>
                    <CheckBox title="Cái ghế" checked></CheckBox>
                    <CheckBox title="Cái giường" checked></CheckBox>
                    <CheckBox title="Cái vali" checked></CheckBox>
                </VStack>
            </View>

            {/* <View style={{flex: 2}} >
                <VStack style={styles.item} >
                    <CheckBox checked={this.state.selectedLang===1} color="#fc5185" onPress={()=>this.setState({selectedLang:1})}></CheckBox>
                    <Typography style={
                    {...styles.checkBoxTxt,
                        color:this.state.selectedLang===1?"#fc5185":"gray",
                        fontWeight:this.state.selectedLang===1? "bold" :"normal"
                    }}>
                        Python
                    </Typography>
                </VStack>
            </View> */}
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#f6f6f6',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     header:{
//       fontSize:25,
//       fontWeight:"bold",
//       color:"#364f6b",
//       marginBottom:40
//     },
//     item:{
//       width:"80%",
//       backgroundColor:"#fff",
//       borderRadius:20,
//       padding:10,
//       marginBottom:10,
//       flexDirection:"row",
//     },
//     checkBoxTxt:{
//       marginLeft:20
//     },
//     submit:{
//       width:"80%",
//       backgroundColor:"#fc5185",
//       borderRadius:20,
//       padding:10,
//       alignItems:"center",
//       marginTop:40
//     }
//   });

