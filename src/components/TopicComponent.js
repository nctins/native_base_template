import React, { useContext } from "react";
import { Alert } from "react-native";
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

import { AxiosContext } from "../contexts/AxiosContext";

const TopicComponent = ({ topic, getAllTopic, onPressTopicTitle }) => {
  // console.log(topic)
  const { authAxios } = useContext(AxiosContext);

  const onPressAlertButton = () => {
    setListTopic((e) =>
      e.map((prev) =>
        prev.id === topic.id ? { ...prev, isAlert: !topic.isAlert } : prev
      )
    );
  };

  const onDeleteTopic = () => {
    let url = "/topic/" + topic._id;
    Alert.alert(
      "Xóa chủ đề",
      "bạn có muốn xóa chỉ đề " + topic.title + " không?",
      [
        {
          text: "OK",
          onPress: () => {
            authAxios
              .delete(url)
              .then((res) => {
                getAllTopic();
              })
              .catch((err) => {
                Alert.alert("ERROR", err.message);
              });
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <Box
      maxW="100%"
      m="2"
      rounded="lg"
      overflow="hidden"
      borderWidth="1"
      _web={{ shadow: 2, borderWidth: 0 }}
      backgroundColor="white"
    >
      <Pressable
        onPress={() => {
          onPressTopicTitle(topic._id);
        }}
      >
        {/* <Pressable > */}
        <Stack p="4" space={3}>
          <HStack space={3} justifyContent="space-between">
            <Heading size="md" ml="-1" color="black">
              <Text>{topic.title}</Text>
            </Heading>
            <IconButton
              size="sm"
              variant="ghost"
              onPress={onDeleteTopic}
              _icon={{
                as: Fontisto,
                name: "trash",
                color: "black",
              }}
            />
          </HStack>
          <HStack space={3} justifyContent="space-between">
            <Text fontWeight="400" color="black">
              {topic.size} từ
            </Text>
            <IconButton
              size="sm"
              variant="ghost"
              // onPress={onPressAlertButton}
              _icon={{
                as: Feather,
                name: topic.isAlert ? "bell" : "bell-off",
                color: "black",
              }}
            />
          </HStack>
        </Stack>
      </Pressable>
    </Box>
  );
};
export default TopicComponent;
