import React from "react";
import { View, Center, StatusBar, Text, VStack, Image } from "native-base";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import Typography from "../components/Typography";
import { Input, PasswordInput } from "../components/Input";

export const LoginScreen = () => {
  return (
    <Center flex={1} bg="primary.1">
      <StatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1, width: "100%"}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack
            style={{ width: "100%", height: "100%" }}
            space={4}
            alignItems="center"
          >
            <Image
              source={require("../../assets/Illustrations/login.png")}
              alt="Login Illustration"
              width={184.15}
              height={286.71}
            />
            <Typography variant="title">Đăng Nhập</Typography>
            <VStack space={4} w="77%">
              <Input icon="email" placeholder="Tài khoản, Email" color={"text.dark"} bg={"white"} />
              <PasswordInput placeholder="Mật khẩu" />
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Center>
  );
};
