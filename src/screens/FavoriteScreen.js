import React, {useState} from "react";
import {
    View,
    StatusBar,
    VStack,
    Icon,
    HStack,
    Button,
    IconButton,
    Box,
    FormControl,
    Modal
} from "native-base";
import { MaterialIcons,Entypo } from "@expo/vector-icons";
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    ScrollView
} from "react-native";
import uuid from 'react-native-uuid';
import Typography from "../components/Typography";
import {SearchbarInput,Input } from "../components/Input";
import WordComponent from "../components/WordComponent";

const FavoriteScreen = ({navigation}) => {

    const styles = {
        TopicTitle: {
            paddingHorizontal:5,
            paddingVertical:2
        }
    }
    const headerRight = () => {
        return (
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", marginRight:15}}>
                <Typography variant="title" style={{color:"white",fontSize:25}}> Yêu thích </Typography>
                <MaterialIcons name='favorite-outline' size={40} style={{color:"white"}}></MaterialIcons>
            </View>
        )
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <Entypo 
                name='menu' 
                size={40}
                color='white'
                style={{marginLeft:20}}
                onPress = {() => {
                    navigation.toggleDrawer();
                }}
            />
          ),
          headerRight: headerRight,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#32A1B9",
            height:70,
        },
        });
      }, [navigation]);

	return (
	  <View flex={1} style={{backgroundColor:"#32A1B9"}}>
        <StatusBar />
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1, width: "100%" }}>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View flex={1}>
                <VStack alignItems="center" paddingVertical={15}>
                    <VStack space={4} w="77%">
                        <SearchbarInput
                            icon="search"
                            placeholder="Tìm kiếm..."
                            color="text.light"/>
                    </VStack>
                </VStack>
				<VStack pt={4} space={4} borderRadius="3xl" style={{width: "100%",height:"100%"}} bgColor= {"primary.2"}>
        			<Box width="100%" height="80%" alignItems={'center'}>
                        <View pb={4} width="90%" showsVerticalScrollIndicator={false}>
                        </View>
					</Box>   
				</VStack>
			</View>
		</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	  </View>
	);
}
export default FavoriteScreen;

