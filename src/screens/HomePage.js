import React, {useState} from "react";
import {
    View,
    StatusBar,
    VStack,
    Icon,
    HStack,
    Button,
    Box,
    FormControl,
    Modal
} from "native-base";
import { MaterialIcons,Entypo } from "@expo/vector-icons";
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    ScrollView
} from "react-native";
import uuid from 'react-native-uuid';
import Typography from "../components/Typography";
import {SearchbarInput,Input } from "../components/Input";
import TopicComponent from "../components/TopicComponent";
import WordComponent from "../components/WordComponent";

const HomePage = ({navigation}) => {
    const [listTopic,setListTopic] = useState([{id:uuid.v4(),name:"test 1",listWord:[{id:uuid.v4(),name:"computer",type:"n","means":"máy tính",description:"abcasdavacacacaca",isFavorite:true},{id:uuid.v4(),name:"hard",type:"adj","means":"chăm chỉ",description:"abcasdavacacacaca",isFavorite:false}],isAlert:true}]);
    const [isViewTotal,setIsViewTotal] = useState(true);
    const [indexTopic,setIndexTopic] = useState(null);

    const styles = {
        TopicTitle: {
            paddingHorizontal:10,
            paddingVertical:2
        }
    }

    const configHeaderRight = () => {
        return (
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", marginRight:15}}>
                <Typography variant="title" style={{color:"white",fontSize:25}}> Trang chủ </Typography>
                <MaterialIcons name='home' size={40} style={{color:"white"}}></MaterialIcons>
            </View>
        )
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <Entypo 
                name='menu' 
                size={40}
                color='white'
                style={{marginLeft:20}}
                onPress = {() => {
                    navigation.toggleDrawer();
                }}
            />
            ),
            headerTitle: "",
            headerRight: configHeaderRight,
            headerStyle: {
                backgroundColor: "#32A1B9",
                height:70,
        },
        });
      }, [navigation]);

    const OnPressTopic = (id) => {
        setIsViewTotal(false);
        setIndexTopic(id);
    }

    const onPressTotal = () => {
        setIsViewTotal(true);
        setIndexTopic(null);    
    }

    const onPressTopicTitle = (id) => {
        setIsViewTotal(false);
        setIndexTopic(id);
    }

    const onPressAddVocabularyButton = () =>{
        navigation.navigate("AddVocabularyScreen");
    }

	return (
	  <View flex={1} style={{backgroundColor:"#32A1B9"}}>
        <StatusBar />
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1, width: "100%" }}>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<VStack space={4}>
                <VStack alignItems="center" marginTop={5}>
                    <VStack space={4} w="77%">
                        <SearchbarInput
                            icon="search"
                            placeholder="Tìm kiếm..."
                            color="text.light"/>
                    </VStack>
                </VStack>  
				<HStack space={3} style={{marginLeft:15}}>
                    <ScrollView horizontal={true}>
                    {
                        isViewTotal ? <View style={[{backgroundColor:"#E9B52F",borderRadius:10},styles.TopicTitle]}><Typography>Tất cả</Typography></View>
                                    : <View style={styles.TopicTitle}><Typography onPress={onPressTotal}>Tất cả</Typography></View>
                    }
                    {
                        listTopic.length > 0 ? listTopic.map((topic,index) => <View key={index} style={indexTopic === topic.id ? [{backgroundColor:"#E9B52F",borderRadius:10},styles.TopicTitle] :styles.TopicTitle}><Typography key={index} onPress={() => onPressTopicTitle(topic.id)}>{topic.name}</Typography></View>) : null
                    }
                    </ScrollView>
				</HStack>
				<VStack pt={4} space={4} borderRadius="3xl" style={{width: "100%"}} bgColor= {"primary.2"}>
                    {
                        isViewTotal? <AddTopic listTopic = {listTopic} setListTopic = {setListTopic} />
                                    : <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
                                        <Button variant="ghost"
                                            _text={{color:"#E9B52F",fontSize:"xl",fontWeight:'bold'}}
                                            onPress={onPressAddVocabularyButton}
                                            leftIcon={<Icon as={MaterialIcons} name="add-circle" size="lg" color={"warning.1"}/>}  
                                        >
                                            Thêm Từ vựng
                                        </Button>     
                                        <Button variant="ghost"
                                            _text={{color:"#E9B52F",fontSize:"xl",fontWeight:'bold'}}
                                            onPress={() => navigation.navigate("Practice")}
                                            leftIcon={<Icon as={MaterialIcons} name="add-circle" size="lg" color={"warning.1"}/>}  
                                        >
                                            Luyện tập
                                        </Button>                             
                                    </View>
                    }
        			<Box width="100%" height="80%" alignItems={'center'}>
                        <View pb={4} width="90%" showsVerticalScrollIndicator={false}>
                            {
                                isViewTotal ? listTopic.length > 0 ? listTopic.map((topic,index) =><TopicComponent key={index} topic={topic} setListTopic = {setListTopic} OnPressTopic={OnPressTopic}/>) : null
                                            : listTopic.length > 0 ? listTopic.map(topic => indexTopic === topic.id ? topic.listWord.length > 0 ? topic.listWord.map((word,index) => <WordComponent key={index} word={word} setListTopic={setListTopic} topicId={topic.id} navigation={navigation}/>) : null : null) : null
                            }
                        </View>
					</Box>   
				</VStack>
			</VStack>
		</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	  </View>
	);
}
export default HomePage;

const AddTopic = ({setListTopic}) => {
    const [showModal, setShowModal] = useState(false);
    const [textInput,setTextInput] = useState("");

    const createTitleTopic = (name) =>{
        let temp = name.replace(" ","_")
    }

    const createTopic = (name) => {
        setListTopic(prev => [...prev,{id:uuid.v4(),name:name,listWord:[],isAlert:true}]);
        setTextInput("");
    }

    return (
    <View>
        <Box flexDirection="row" width="100%">
            <Button variant="ghost"
                _text={{color:"#E9B52F",fontSize:"xl",fontWeight:'bold'}}
                onPress={() => setShowModal(true)}
                leftIcon={<Icon as={MaterialIcons} name="add-circle" size="lg" color={"warning.1"}/>}  
            >
                Tạo chủ đề
            </Button>
        </Box>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
            <Modal.Content colorScheme="white"  minWidth="300px" backgroundColor="white">
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
                            value={textInput}
                            onChangeText={value => setTextInput(value)}
                        />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer backgroundColor="white" >
                    <Button
                        width="80%"
                        colorScheme="yellow"
                        color='#E9B52F'
                        flex="1"
                        borderRadius="full"
                        onPress={() => {
                            setShowModal(false);
                            createTopic(textInput);
                        }}>
                        Thêm chủ đề
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </View>
    );
}

