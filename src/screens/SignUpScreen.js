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

const SignUpScreen = ({navigation}) => {
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
              source={require("../../assets/Illustrations/register.png")}
              alt="Register Illustration"
              width={386}
              height={255}
            />
            <VStack space={4} w="77%">
              <Input
                icon="email"
                placeholder="Email"
                color={"text.dark"}
                bg={"white"}
              />
              <Input
                icon="email"
                placeholder="Tài khoản"
                color={"text.dark"}
                bg={"white"}
              />
              <PasswordInput placeholder="Mật khẩu" />
              <Button bgColor={"warning.1"} borderRadius="30" shadow={2} onPress={() => navigation.navigate('LoginScreen')}>
                <Typography variant="buttonText" color="text.light">
                  Đăng ký
                </Typography>
              </Button>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Center>
  );
}
export default SignUpScreen;
