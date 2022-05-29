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
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import uuid from "react-native-uuid";
import Typography from "../components/Typography";
import { SearchbarInput, Input } from "../components/Input";
import TopicComponent from "../components/TopicComponent";
import WordComponent from "../components/WordComponent";
import { AxiosContext } from "../contexts/AxiosContext";

const VocabScreen = ({ route, navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const [listTopic, setListTopic] = useState([]);
  const [listWord, setListWord] = useState([]);
  const { topicId } = route.params;

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

  const getVocab = () => {
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

  useEffect(() => {
    getVocab();
  }, [topicId]);
  
  useEffect(() => {
    getAllTopic();
  }, []);

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

  React.useLayoutEffect(() => {
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
      headerStyle: {
        backgroundColor: "#32A1B9",
        height: 70,
      },
    });
  }, [navigation]);

  const onPressTotal = () => {
    navigation.navigate("HomeScreen");
  };

  const onPressTopicTitle = (id) => {
    navigation.navigate("VocabScreen", {
      topicId: id,
    });
  };

  const onPressAddVocabularyButton = () => {
    navigation.navigate("AddVocabScreen", {
      topicId: topicId,
    });
  };

  const TopicLabel = (topic, idx) => {
    if (topic._id === topicId) {
      return (
        <View key={idx} style={styles.ActiveTopic}>
          <Typography key={idx} onPress={() => onPressTopicTitle(topic._id)}>
            {topic.title}
          </Typography>
        </View>
      );
    }
    return (
      <View key={idx} style={styles.TopicTitle}>
        <Typography key={idx} onPress={() => onPressTopicTitle(topic._id)}>
          {topic.title}
        </Typography>
      </View>
    );
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
                <View style={styles.TopicTitle}>
                  <Typography
                    onPress={() => {
                      onPressTotal();
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

              <Box width="100%" height="80%" alignItems={"center"}>
                <View pb={4} width="90%" showsVerticalScrollIndicator={false}>
                  <ScrollView height="90%">
                    {listWord.length > 0 ? (
                      listWord.map((vocab, idx) => {
                        return (
                          <WordComponent
                            key={idx}
                            word={vocab}
                            setListTopic={setListTopic}
                            topicId={topicId}
                            navigation={navigation}
                          />
                        );
                      })
                    ) : (
                      <Center pt={"30%"}>
                        <Typography variant="smallText" color="#000">
                          Bạn chưa có từ nào trong chủ đề này
                        </Typography>
                      </Center>
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
export default VocabScreen;
