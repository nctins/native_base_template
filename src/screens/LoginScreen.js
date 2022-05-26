import React from "react";
import {
  Center,
  StatusBar,
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

const LoginScreen = ({navigation}) => {
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
              source={require("../../assets/Illustrations/login.png")}
              alt="Login Illustration"
              width={184.15}
              height={286.71}
            />
            <Typography variant="title">Đăng Nhập</Typography>
            <VStack space={4} w="77%">
              <Input
                icon="email"
                placeholder="Tài khoản, Email"
                color={"text.dark"}
                bg={"white"}
              />
              <PasswordInput placeholder="Mật khẩu" />
              <HStack style={{ width: "100%"}}>
                <Typography variant="smallText" onPress={() => navigation.navigate('SignUpScreen')}>Đăng ký</Typography>
                <Typography
                  variant="smallText"
                  color={"text.dark"}
                  style={{ position: 'absolute', right: 0 }}
                >
                  Quên mật khẩu?
                </Typography>
              </HStack>
              <Button bgColor={"warning.1"} borderRadius="30" shadow={2} onPress={() => navigation.navigate('DrawerNavigation')}>
                <Typography variant="buttonText" color="text.light">Đăng nhập</Typography>
              </Button>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Center>
  );
}
export default LoginScreen;
