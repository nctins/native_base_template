import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StatusBar,
  VStack,
  Icon,
  HStack,
  Button,
  Box,
  FormControl,
  Modal,
  Center,
} from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import Typography from "../components/Typography";
import { SearchbarInput, Input } from "../components/Input";
import TopicComponent from "../components/TopicComponent";
import WordComponent from "../components/WordComponent";
import { AxiosContext } from "../contexts/AxiosContext";

const HomePage = ({ navigation, route }) => {
  const styles = {
    TopicTitle: {
      paddingHorizontal: 10,
      paddingVertical: 2,
    },
    ActiveTopic: {
      paddingHorizontal: 10,
      paddingVertical: 2,
      backgroundColor: "#E9B52F",
      borderRadius: 10,
    },
  };

  // State
  const { authAxios } = useContext(AxiosContext);
  const [listTopic, setListTopic] = useState([]);
  const [listWord, setListWord] = useState([]);
  const [topicId, setTopicId] = useState("");
  const [vocabMod, setVocabMod] = useState(false);
  const isFocused = useIsFocused();

  // Callback
  const getAllTopic = () => {
    authAxios
      .get("/getAllTopic")
      .then((res) => {
        const topics = res.data.data.topics;
        topics ? setListTopic(topics) : setListTopic([]);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("ERROR", err.message);
      });
  };

  const getVocab = (topicId) => {
    const uri = "/topic/" + topicId + "/getVocab";
    authAxios
      .get(uri)
      .then((res) => {
        setListWord(res.data.data.vocab);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("ERROR", err.message);
      });
  };

  const onPressAddVocabularyButton = () => {
    navigation.navigate("AddVocabScreen", {
      topicId: topicId,
      getVocab:  getVocab,
    });
  };

  const configHeaderRight = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 15,
        }}
      >
        <Typography variant="title" style={{ color: "white", fontSize: 25 }}>
          {" "}
          Trang chủ{" "}
        </Typography>
        <MaterialIcons
          name="home"
          size={40}
          style={{ color: "white" }}
        ></MaterialIcons>
      </View>
    );
  };

  const onPressTopicTitle = async (id) => {
    setTopicId(id);
    getVocab(id);
    setVocabMod(true);
  };

  const onPressViewAll = () => {
    setTopicId(null);
    getAllTopic();
    setVocabMod(false);
  };

  // react effect

  useEffect(() => {
    if(vocabMod){
      getVocab(topicId);
    }
    getAllTopic();
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Entypo
          name="menu"
          size={40}
          color="white"
          style={{ marginLeft: 20 }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      ),
      headerTitle: "",
      headerRight: configHeaderRight,
      headerStyle: {
        backgroundColor: "#32A1B9",
        height: 70,
      },
    });
  }, [navigation]);

  // Sub component

  const TopicLabel = (topic, idx) => {
    return (
      <View
        key={idx}
        style={
          vocabMod && topicId === topic._id
            ? styles.ActiveTopic
            : styles.TopicTitle
        }
      >
        <Typography key={idx} onPress={() => onPressTopicTitle(topic._id)}>
          {topic.title}
        </Typography>
      </View>
    );
  };

  const TopicContent = () => {
    if (listTopic.length > 0) {
      return listTopic.map((topic, index) => (
        <TopicComponent
          key={index}
          topic={topic}
          getAllTopic={getAllTopic}
          onPressTopicTitle={onPressTopicTitle}
        />
      ));
    } else {
      return (
        <Center pt={"30%"}>
          <Typography variant="smallText" color="#000">
            Bạn chưa có chủ đề nào.
          </Typography>
        </Center>
      );
    }
  };

  const VocabContent = () => {
    if (listWord.length > 0) {
      return listWord.map((vocab, idx) => {
        return (
          <WordComponent
            key={idx}
            word={vocab}
            navigation={navigation}
            callback={null}
          />
        );
      });
    } else {
      return (
        <Center pt={"30%"}>
          <Typography variant="smallText" color="#000">
            Bạn chưa có từ nào trong chủ đề này
          </Typography>
        </Center>
      );
    }
  };

  const ToolBar = () => {
    if (vocabMod) {
      return (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="ghost"
            _text={{
              color: "#E9B52F",
              fontSize: "xl",
              fontWeight: "bold",
            }}
            onPress={onPressAddVocabularyButton}
            leftIcon={
              <Icon
                as={MaterialIcons}
                name="add-circle"
                size="lg"
                color={"warning.1"}
              />
            }
          >
            Thêm Từ vựng
          </Button>
          <Button
            variant="ghost"
            _text={{
              color: "#E9B52F",
              fontSize: "xl",
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate("Practice")}
            leftIcon={
              <Icon
                as={MaterialIcons}
                name="add-circle"
                size="lg"
                color={"warning.1"}
              />
            }
          >
            Luyện tập
          </Button>
        </View>
      );
    } else {
      return <AddTopic setListTopic={setListTopic} getAllTopic={getAllTopic} />;
    }
  };

  return (
    <View flex={1} style={{ backgroundColor: "#32A1B9" }}>
      <StatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack space={4}>
            <VStack alignItems="center" marginTop={5}>
              <VStack space={4} w="77%">
                <SearchbarInput
                  icon="search"
                  placeholder="Tìm kiếm..."
                  color="text.light"
                />
              </VStack>
            </VStack>
            <HStack space={3} style={{ marginLeft: 15 }}>
              <ScrollView horizontal={true}>
                <View style={vocabMod ? styles.TopicTitle : styles.ActiveTopic}>
                  <Typography
                    onPress={() => {
                      onPressViewAll();
                    }}
                  >
                    Tất cả
                  </Typography>
                </View>
                {listTopic.map(TopicLabel)}
              </ScrollView>
            </HStack>
            <VStack
              pt={4}
              space={4}
              borderRadius="3xl"
              style={{ width: "100%" }}
              bgColor={"primary.2"}
            >
              <ToolBar />
              <Box width="100%" height="80%" alignItems={"center"}>
                <View pb={4} width="90%" showsVerticalScrollIndicator={false}>
                  <ScrollView height="90%">
                    {vocabMod ? <VocabContent /> : <TopicContent />}
                  </ScrollView>
                </View>
              </Box>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default HomePage;

//modal
const AddTopic = ({ setListTopic, getAllTopic }) => {
  const { authAxios } = useContext(AxiosContext);

  const [showModal, setShowModal] = useState(false);
  const [textInput, setTextInput] = useState("");

  const onCreateTopic = async () => {
    authAxios
      .post("/addTopic", {
        title: textInput,
      })
      .then((res) => {
        setShowModal(false);
        getAllTopic();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <View>
      <Box flexDirection="row" width="100%">
        <Button
          variant="ghost"
          _text={{ color: "#E9B52F", fontSize: "xl", fontWeight: "bold" }}
          onPress={() => setShowModal(true)}
          leftIcon={
            <Icon
              as={MaterialIcons}
              name="add-circle"
              size="lg"
              color={"warning.1"}
            />
          }
        >
          Tạo chủ đề
        </Button>
      </Box>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content
          colorScheme="white"
          minWidth="300px"
          backgroundColor="white"
        >
          <Modal.CloseButton />
          <Modal.Header backgroundColor="white">
            <Typography color="black">Tên chủ đề</Typography>
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input
                icon="person"
                color={"secondary.2"}
                bg="white"
                value={textInput}
                onChangeText={(value) => setTextInput(value)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer backgroundColor="white">
            <Button
              width="80%"
              colorScheme="yellow"
              color="#E9B52F"
              flex="1"
              borderRadius="full"
              onPress={() => onCreateTopic()}
            >
              Thêm chủ đề
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};
