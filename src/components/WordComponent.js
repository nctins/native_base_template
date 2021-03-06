import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  Text,
  Pressable,
  Image,
  HStack,
  Box,
  Stack,
  Heading,
} from "native-base";
import { AxiosContext } from "../contexts/AxiosContext";

const WordComponent = ({ word, navigation, callback }) => {
  const { authAxios } = useContext(AxiosContext);
  const [isFavorite, setIsFavorite] = useState(word.favorite);

  const onPressFavoriteIcon = () => {
    const uri = "/vocab/" + word._id + "/changeFavorite";
    authAxios
      .put(uri)
      .then((res) => {
        word.favorite = res.data.newStatus;
        setIsFavorite(word.favorite);
        if (callback) {
          callback();
        }
      })
      .catch(() => {
        Alert.alert("ERROR", "Thay đổi trạng thái không thành công.");
      });
  };

  const onPressWord = () => {
    navigation.navigate("Detail", {
      word: word,
    });
  };

  return (
    <Box
      maxW="100%"
      m="2"
      rounded="lg"
      overflow="hidden"
      borderWidth="1"
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      backgroundColor="white"
    >
      <Pressable
        onPress={() => {
          onPressWord();
        }}
      >
        <Stack p="4" space={3}>
          <HStack space={3} justifyContent="space-between">
            <Heading size="md" color="black">
              {word.title}
            </Heading>
            {isFavorite ? (
              <AntDesign
                name="heart"
                size={24}
                color={"red"}
                onPress={onPressFavoriteIcon}
              />
            ) : (
              <AntDesign
                name="hearto"
                size={24}
                color={"red"}
                onPress={onPressFavoriteIcon}
              />
            )}
          </HStack>
          <HStack space={3} justifyContent="space-between">
            <Text fontWeight="400" color="black">
              {word.note}
            </Text>
            <Image
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              size="xl"
              alt="default image"
            />
          </HStack>
        </Stack>
      </Pressable>
    </Box>
  );
};
export default WordComponent;
