import React, { useState } from "react";
import { Input as DefaultInput, Icon } from "native-base";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";

export const Input = (props) => {
  const { icon, ...otherProps } = props;
  return (
    <DefaultInput
      variant="filled"
      bg={"white"}
      autoFocus={false}
      InputLeftElement={
        <Icon
          as={<MaterialIcons name={icon} />}
          size={5}
          ml="2"
          color="warning.1"
        />
      }
      {...otherProps}
    />
  );
};

export const PasswordInput = (props) => {
  const [show, setShow] = useState(false);
  return (
    <DefaultInput
      variant="filled"
      bg={"white"}
      InputLeftElement={
        <Icon
          as={<Fontisto name="locked" />}
          size={5}
          ml="2"
          color="warning.1"
        />
      }
      type={show ? "text" : "password"}
      InputRightElement={
        <Icon
          as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
          size={5}
          mr="2"
          color="warning.1"
          onPress={() => setShow(!show)}
        />
      }
      {...props}
    />
  );
};
