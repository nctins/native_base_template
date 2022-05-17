import React from "react";
import {
  View,
  Center,
  StatusBar,
  Text,
  VStack,
  Image,
  HStack,
  Button,
} from "native-base";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import Typography from "../components/Typography";
export const VocaDetail = () => {
  return (
    <Center flex={1} bg="primary.2">
        <StatusBar />
        <VStack
          style={{ width: "100%", height: "100%" }}
          space={4}
          alignItems="center"
          justifyContent="center"
        >
          <VStack space={2} justifyContent="center" alignItems="center" safeAreaTop mb={6}>
            {["2xl"].map(size => 
              <Image key={size} size={size} resizeMode="cover"
              source={require("../../assets/images/table.jpg")}
              alt={"Vocal image " + size} 
            />)}
          </VStack>

          <Typography variant="vocalTextE" color="text.dark">Table (n)</Typography>
          <Typography variant="vocalTextV" color="text.dark">Cái bàn</Typography>
          
          <Button.Group borderRadius="100" w="50%" h="5%" mt="12%">
            <Button bgColor="edit" w="50%" h="100%">Chỉnh sửa</Button>
            <Button bgColor="danger" w="50%" h="100%">Xóa</Button>
          </Button.Group>
        </VStack>
    </Center>
  );
};
