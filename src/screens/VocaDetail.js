import React, { useState } from "react";
import {
  View,
  Center,
  StatusBar,
  Text,
  VStack,
  Image,
  HStack,
  Button,
  IconButton,
} from "native-base";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Pressable
} from "react-native";
import Typography from "../components/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';

const VocaDetail = ({navigation}) => {
  const [liked, setLiked] = useState(false);
  return (
    <View style={{flex: 1}} bg="primary.2">
      <View style={{flex: 0.5, flexDirection: 'row'}}>
        <View style={{flex: 0.1}} >
          
        </View>
        <View style={{flex: 0.3}} >
          <VStack
            style={{ width: "100%", height: "100%" }}
            space={4}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Icon name="chevron-left" size={20} color="rgba(102, 102, 102, 1)" onPress={() => navigation.goBack()}/>
          </VStack>
        </View>
        <View style={{flex: 1.5}} >
          
        </View>
        <View style={{flex: 0.3}} >
          <VStack
            style={{ width: "100%", height: "100%" }}
            space={4}
            alignItems="center"
            justifyContent="flex-end"
          >
          </VStack>
        </View>
        <View style={{flex: 0.1}} >
          
        </View>
      </View>
      <View style={{flex: 0.1}} >
          
      </View>
      <View style={{flex: 1}} >
        <VStack
          style={{ width: "100%", height: "100%" }}
          space={4}
          alignItems="center"
          justifyContent="center"
        >
        <Image 
          source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg"
          }} 
          size="40"
          alt="default image"
        />
        </VStack>
      </View>

      <View style={{flex: 0.5, flexDirection: 'column'}}>
        <View style={{flex: 0.5,flexDirection: 'row'}} >
          <View style={{flex: 0.5}} >
            <VStack
              style={{ width: "100%", height: "100%" }}
              space={4}
              paddingLeft="5"
              justifyContent="center"
            >
              <Typography variant="vocalTextE" color="text.dark">Table (n)</Typography>
            </VStack>
          </View>

          <View style={{flex: 0.5}} >
            <VStack
              style={{ width: "100%", height: "100%" }}
              space={4}
              paddingRight={5}
              alignItems="flex-end"
              justifyContent="center"
            >
              <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
                <MaterialCommunityIcons
                  name={liked ? "heart" : "heart-outline"}
                  size={32}
                  color={liked ? "red" : "black"}
                />
              </Pressable>
            </VStack>
          </View>
        </View>

        <View style={{flex: 0.5, flexDirection: 'row'}} >
          <View style={{flex: 0.5}} >
              <VStack
                style={{ width: "100%", height: "100%" }}
                space={4}
                paddingLeft="5"
                justifyContent="center"
              >
                <Typography variant="vocalTextV" color="text.dark">Cái bàn</Typography>
              </VStack>
            </View>
          </View>
        </View>

      <View style={{
        flex: 1.5,
        margin: 20,
        borderWidth: 4,
        borderColor: '#E9B52F',
        borderRadius: 10,
      }}>
        <VStack
          style={{ width: "100%", height: "100%" }}
          space={4}
          alignItems="center"
        >
          <Typography variant="vocalTextV" color="text.dark" padding="2">
            Một bề mặt phẳng, thường được hỗ trợ bởi bốn chân, được sử dụng để đặt các vật
          </Typography>
        </VStack>
      </View>

      <View style={{
        flex: 0.5
      }}>
        <VStack
          style={{ width: "100%", height: "100%" }}
          space={4}
          alignItems="center"
          justifyContent="center"
        >
          <Button.Group borderRadius="10" w="50%" h="50%">
            <Button bgColor="edit" w="50%" h="100%">Chỉnh sửa</Button>
            <Button bgColor="danger" w="50%" h="100%">Xóa</Button>
          </Button.Group> 
        </VStack>
      </View>

    </View>
  );
}
export default VocaDetail;