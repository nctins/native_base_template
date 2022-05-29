import React, {useState} from "react";
import {View} from 'react-native';
import { Fontisto, AntDesign } from "@expo/vector-icons";
import {
    Center,
    StatusBar,
    Text,
    Pressable,
    VStack,
    Image,
    Icon,
    HStack,
    Button,
    IconButton,
    Box,
    ScrollView,
    FormControl,
    Modal,
    Stack,
    Heading,
    FlatList,
} from "native-base";

const WordComponent = ({word,setListTopic,topicId,navigation}) => {

    const onPressFavoriteIcon = () => {
        // setListTopic(prevTopic => prevTopic.id === topicId ? prevTopic.listWord.map(prevWord => prevWord.id === word.id ? {...prevWord,isFavorite:true}:prevWord) : prevTopic);
        setListTopic(prevTopic => prevTopic.id === topicId ? {...prevTopic,listWord:prevTopic.listWord.map(prevWord => prevWord.id === word.id ? {...prevWord,isFavorite:true}:prevWord)} : prevTopic);
        console.log("press love icon!");
        console.log("topicId: " + topicId);
    }

    return (
        <Box maxW="100%" m="2"  rounded="lg" overflow="hidden" borderWidth="1"  
            _web={{
                shadow: 2,
                borderWidth: 0
            }}
            backgroundColor="white" 
        >
            <Pressable onPress={() => navigation.navigate("Detail")}>
            <Stack p="4" space={3}>
                <HStack space={3} justifyContent="space-between">
                    <Heading size="md" color="black">
                        {word.title}
                    </Heading>
                    {
                        word.isFavorite ? <AntDesign name="heart" size={24} color={"red"} onPress={onPressFavoriteIcon} />
                                        : <AntDesign name="hearto" size={24} color={"red"} onPress={onPressFavoriteIcon} />
                    }
                </HStack>
                <HStack space={3} justifyContent="space-between">
                    <Text fontWeight="400" color="black">{word.note}</Text>
                    <Image 
                        source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg"
                        }} 
                        size="xl"
                        alt="default image"
                        />
                </HStack>
            </Stack>
            </Pressable>
        </Box>
    );
}
export default WordComponent;