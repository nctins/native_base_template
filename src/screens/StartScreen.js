import React from "react";
import { Button, Center, StatusBar, VStack, Image } from "native-base";
import Typography from "../components/Typography";

export const StartScreen = () => {
  return (
    <Center flex={1} bg="primary.1">
      <StatusBar />
      <VStack
        style={{ width: "100%", height: "100%" }}
        space={4}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          source={require("../../assets/images/logo.png")}
          alt="logo"
          width={274}
          height={274}
        />
        <Typography variant="logo">VocaNo</Typography>
        <Typography variant="smallText">
          Ghi lại từ vựng yêu thích của bạn
        </Typography>
        <Button.Group isAttached borderRadius="15" w="80%" h="7%" mt="12%">
          <Button bgColor="warning.1" w="50%" h="100%">Đăng nhập</Button>
          <Button bgColor="warning.2" w="50%" h="100%">Đăng ký</Button>
        </Button.Group>
      </VStack>
    </Center>
  );
};
