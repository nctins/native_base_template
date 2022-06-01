import React, { useContext, useState } from "react";
import {
  Center,
  StatusBar,
  VStack,
  Image,
  Button,
} from "native-base";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import Typography from "../components/Typography";
import { Input, PasswordInput } from "../components/Input";
import { AxiosContext } from "../contexts/AxiosContext";

const SignUpScreen = ({ navigation }) => {
  const { publicAxios } = useContext(AxiosContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSingUp = async () => {
    publicAxios
      .post("/register", {
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        navigation.navigate("RegisterSuccessScreen");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("ERROR", JSON.stringify(error?.response?.data?.errors));
      });
  };

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
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
              <Input
                icon="email"
                placeholder="Tài khoản"
                color={"text.dark"}
                bg={"white"}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                }}
              />
              <PasswordInput
                placeholder="Mật khẩu"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <Button
                bgColor={"warning.1"}
                borderRadius="30"
                shadow={2}
                onPress={() => onSingUp()}
              >
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
};
export default SignUpScreen;
