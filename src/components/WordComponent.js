import React, {useState} from "react";
import {View} from 'react-native';
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
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

const WordComponent = ({word}) => {
    return (
        <Box maxW="100%" m="2"  rounded="lg" overflow="hidden" borderWidth="1"  
            _web={{
                shadow: 2,
                borderWidth: 0
            }}
            backgroundColor="white" 
        >
            <Pressable>
            <Stack p="4" space={3}>
                <HStack space={3} justifyContent="space-between">
                    <Heading size="md" ml="-1" color="black">
                        {word.name}
                    </Heading>
                    <IconButton size="sm"  
                        variant="ghost"
                        onPress={() => console.log("press like button!")}
                        _icon={{
                            as: Fontisto,
                            name: "heart",
                            color: "red"
                        }} 
                    /> 
                </HStack>
                <HStack space={3} justifyContent="space-between">
                    <Text fontWeight="400" color="black">{word.description}</Text>
                    <Image source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} size="xl" />
                </HStack>
            </Stack>
            </Pressable>
        </Box>
    );
}
export default WordComponent;