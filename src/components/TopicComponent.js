import React, {useState} from "react";
import {View} from 'react-native';
import { Fontisto, Feather } from "@expo/vector-icons";
import {
    Text,
    Pressable,
    HStack,
    IconButton,
    Box,
    Stack,
    Heading,
} from "native-base";

const TopicComponent = ({topic,setListTopic,OnPressTopic}) => {

    const onPressAlertButton = () => {
        setListTopic(e => e.map(prev => prev.id === topic.id ? {...prev,isAlert:!topic.isAlert}:prev));
    }

    const onPressDeleteButton = () => {
        setListTopic(e => e.filter(prev => prev.id !== topic.id));
    }

    return (
        <Box maxW="100%" m="2"  rounded="lg" overflow="hidden" borderWidth="1"  _web={{shadow: 2,borderWidth: 0}} backgroundColor="white" >
            <Pressable onPress={() => OnPressTopic(topic.id)}>
            <Stack p="4" space={3}>
                <HStack space={3} justifyContent="space-between">
                    <Heading size="md" ml="-1" color="black">
                        <Text>{topic.name}</Text>
                    </Heading>
                    <IconButton size="sm"  
                        variant="ghost"
                        onPress={onPressDeleteButton}
                        _icon={{
                        as: Fontisto,
                        name: "trash",
                        color: "black"
                        }} 
                        /> 
                </HStack>
                <HStack space={3} justifyContent="space-between">
                    <Text fontWeight="400" color="black">{topic.listWord.length}</Text>
                    <IconButton size="sm"  
                        variant="ghost"
                        onPress={onPressAlertButton}
                        _icon={{
                        as: Feather,
                        name: topic.isAlert ? "bell" : "bell-off",
                        color: "black"
                        }} 
                    /> 
                </HStack>
            </Stack>
            </Pressable>
        </Box>
    );
}
export default TopicComponent;