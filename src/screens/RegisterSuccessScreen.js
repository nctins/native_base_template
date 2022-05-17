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
import { Input, PasswordInput } from "../components/Input";

export const RegisterSuccessScreen = () => {
  return (
    <Center flex={1} bg="primary.1">
      <StatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack
            style={{ width: "100%", height: "100%" }}
            space={4}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              source={require("../../assets/Illustrations/congratulation.png")}
              alt="Congratulation Illustration"
              width={276}
              height={340}
            />
            <Typography variant="title">Đăng ký thành công</Typography>
            <VStack w="77%" mt="7%">
              <Button bgColor={"warning.1"} borderRadius="30" shadow={2}>
                <Typography variant="buttonText" color="text.light">
                  Tiếp tục
                </Typography>
              </Button>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Center>
  );
};
