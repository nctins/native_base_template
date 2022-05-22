import React, {useState,useEffect} from "react";
import {
  View,
  Center,
  StatusBar,
  Text,
  VStack,
  Image,
  Icon,
  HStack,
  Button,
  IconButton,
  Box,
  ScrollView,
  FormControl,
  Modal,
  Stack,
  Heading,
 FlatList,
} from "native-base";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  
} from "react-native";
import Typography from "../components/Typography";
import {SearchbarInput,Input } from "../components/Input";






export const HomePage = () => {
  return (
    <Center flex={1} bg="primary.1">
      <StatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack
            space={4}
            alignItems="center"
          >  
            <Box width="77%">
            <IconButton size="lg" 
            color={"primary.1"}
            alignSelf="flex-start"
            _icon={{
              as: MaterialIcons,
              name: "menu",
              color: "text.light"
            }} 
          /> 
          </Box>
            <VStack space={4} w="77%">
              <SearchbarInput
                icon="search"
                
                placeholder="Tìm kiếm..."
                color="text.light"
                
              />
              
            </VStack>
            
      <HStack space={3} justifyContent="center">
            <Typography> Tất cả</Typography>
            <Typography> Like</Typography>
            <Typography> Like</Typography>
      </HStack>;
      <VStack 
        
        pt={8}
        space={4}
        borderRadius="lg"
        style={{ width: "100%"}} 
        alignItems="center" 
        bgColor= {"primary.2"}>
        <AddTopicModal/>
        <Box width="100%" height="80%">
        <ScrollView pb={8} width="100%" showsVerticalScrollIndicator={false}>
          <VSwipeList/>
        </ScrollView>
        </Box>   
        
          
    
 
    
        
            </VStack>
           
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Center>
  );
};


///modal

const AddTopicModal = () => {
  const [showModal, setShowModal] = useState(false);
  
  return <>
      <Box flexDirection="row" width="100%">
      <Button 

      variant="ghost"
     
      _text={{color:"warning.1"}}
      onPress={() => setShowModal(true)}
      leftIcon={<Icon as={MaterialIcons} name="add-circle" size="lg" color={"warning.1"}/>}>
        Tạo chủ đề
      </Button>
    </Box>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content colorScheme="white"  maxWidth="400px" backgroundColor="white">
          <Modal.CloseButton />
          <Modal.Header backgroundColor="white" >
          <Typography color="black" >Tên chủ đề</Typography>
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              
              <Input
                icon="person"
                color={"secondary.2"}
                bg="white"
              />
            </FormControl>
      
          </Modal.Body>
          <Modal.Footer backgroundColor="white" color="black" >
            
              <Button
              width="80%"
              colorScheme="yellow"
              color='white'
              flex="1"
              borderRadius="full"
              onPress={() => {
              setShowModal(false);
            }}>
                Thêm chủ đề
              </Button>
  
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>;
};

///Tab Item



//tab swipe
const data = [];
const favouriteList=[]
for (let i = 0; i < 7; i++) {
  const wordlist=[]
  for (let j=0;j<i+10;j++)
  {
    wordlist.push(
      {
        word: "Word "+ i + " "+ j,
        description: "Description" + i + " " + j,
        favourite: (j==i)? true:false
      }
    )
  }
  favouriteList.push(wordlist[i][i])
  data.push(
      {
        topicName: "topic "+i,
        wordNum:10+i + " từ",
        wordList: wordlist,
        notify: false
      }
    )
  }
export const VSwipeList=(type)=> {
  

const setFavourite=(item)=>
{
  item.favourite= !item.favourite
}
const deleteWord=(topic,index)=>
{
  topic.splice(index,1)
}
const deleteTopic= (index)=>
{
  allTopic.splice(index,1)
}
const setNotify=(index)=>
{
  allTopic[index].notify= !allTopic[index].notify
}
const renderTopic = ({
  item, index
}) => 
      <Box maxW="100%" m="2"  rounded="lg" overflow="hidden" borderWidth="1"  _web={{
      shadow: 2,
      borderWidth: 0
      }}
      backgroundColor="white" 
    >
        
        <Stack p="4" space={3}>
          <HStack space={3} justifyContent="space-between">
            <Heading size="md" ml="-1" color="black">
            <Text>{item.topicName}</Text>
            </Heading>
            <IconButton size="sm"  
            variant="ghost"
            onPress={() => deleteTopic(index)}
            _icon={{
              as: Fontisto,
              name: "trash",
              color: "black"
            }} 
           /> 
         </HStack>
         <HStack space={3} justifyContent="space-between">
          <Text fontWeight="400" color="black">
          {item.wordNum}
          </Text>
          <IconButton size="sm"  
            variant="ghost"
            onPress={() => setNotify(index)}
            _icon={{
              as: Fontisto,
              name: "bell",
              color: "black"
            }} 
           /> 
          </HStack>
        </Stack>
       
      </Box>
    
 ;

const RenderWord=({item})=>
    <Box maxW="100%" m="2"  rounded="lg" overflow="hidden" borderWidth="1"  _web={{
      shadow: 2,
      borderWidth: 0
      }}
      backgroundColor="white" 
    >
        
        <Stack p="4" space={3}>
          <HStack space={3} justifyContent="space-between">
            <Heading size="md" ml="-1" color="black">
            {item.word}
            </Heading>
            <IconButton size="sm"  
            variant="ghost"
            onPress={() => setFavourite(item)}
            _icon={{
              as: Fontisto,
              name: "heart",
              color: "red"
            }} 
           /> 
         </HStack>
         <HStack space={3} justifyContent="space-between">
          <Text fontWeight="400" color="black">
          {item.description}
          </Text>
          <Image source={{
      uri: "https://wallpaperaccess.com/full/317501.jpg"
    }} size="xl" />
          </HStack>
        </Stack>
       
      </Box>
    
 ;
 
 
  
 if (type=="like")
  return <Box width="100%" paddingBottom="16">
  <FlatList data={favouriteList} renderItem={RenderWord} />
  </Box>;
return <Box width="100%" paddingBottom="16">
  <FlatList data={data} renderItem={renderTopic} />
  </Box>;
}

