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

const HomePage = ({ navigation }) => {
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
  const [keySearch, setKeySearch] = useState("");
  const [searchMod, setSearchMod] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
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
      getVocab: getVocab,
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
          Trang ch???{" "}
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

  const onSearch = () => {
    if (keySearch) {
      setSearchMod(true);
      setSearchResult([]);
      const data = { params: { keySearch: keySearch } };
      if (vocabMod) {
        const uri = "/topic/" + topicId + "/search";
        authAxios.get(uri, data).then((res) => {
          setSearchResult(res.data.data);
        });
      } else {
        const uri = "/search";
        authAxios.get(uri, data).then((res) => {
          setSearchResult(res.data.data);
        });
      }
    } else {
      setSearchMod(false);
    }
  };

  // react effect

  useEffect(() => {
    if (vocabMod) {
      getVocab(topicId);
    }
    getAllTopic();
    onSearch();
  }, [isFocused]);

  useEffect(()=>{
    onSearch();
  },[vocabMod])

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
        <Typography
          key={idx}
          onPress={() => {
            onPressTopicTitle(topic._id);
          }}
        >
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
            B???n ch??a c?? ch??? ????? n??o.
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
            B???n ch??a c?? t??? n??o trong ch??? ????? n??y
          </Typography>
        </Center>
      );
    }
  };

  const SearchContent = () => {
    if (searchResult.length > 0) {
      if (vocabMod) {
        return searchResult.map((vocab, idx) => {
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
        return searchResult.map((topic, index) => (
          <TopicComponent
            key={index}
            topic={topic}
            getAllTopic={getAllTopic}
            onPressTopicTitle={onPressTopicTitle}
          />
        ));
      }
    } else {
      return (
        <Center pt={"30%"}>
          <Typography variant="smallText" color="#000">
            Kh??ng c?? k???t qu??? n??o ph?? h???p.
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
            Th??m T??? v???ng
          </Button>
          <Button
            variant="ghost"
            _text={{
              color: "#E9B52F",
              fontSize: "xl",
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate("Practice",{
              listWord:listWord,
            })}
            leftIcon={
              <Icon
                as={MaterialIcons}
                name="assignment"
                size="lg"
                color={"warning.1"}
              />
            }
          >
            Luy???n t???p
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
                  placeholder="T??m ki???m..."
                  color="text.light"
                  onChangeText={(text) => {
                    setKeySearch(text);
                  }}
                  value={keySearch}
                  onEndEditing={() => {
                    onSearch();
                  }}
                />
              </VStack>
            </VStack>
            <HStack space={3} style={{ marginLeft: 15 }}>
              <ScrollView horizontal={true}>
                <View style={vocabMod ? styles.TopicTitle : styles.ActiveTopic}>
                  <Typography
                    onPress={() => {
                      onPressViewAll();
                      if (searchMod) {
                        onSearch();
                      }
                    }}
                  >
                    T???t c???
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
                    {searchMod ? (
                      <SearchContent />
                    ) : vocabMod ? (
                      <VocabContent />
                    ) : (
                      <TopicContent />
                    )}
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
          T???o ch??? ?????
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
            <Typography color="black">T??n ch??? ?????</Typography>
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
              Th??m ch??? ?????
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};
