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
import Typography from "../components/Typography";
import { SearchbarInput, Input } from "../components/Input";
import TopicComponent from "../components/TopicComponent";
import { AxiosContext } from "../contexts/AxiosContext";

const HomePage = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const [listTopic, setListTopic] = useState([]);
  const [indexTopic, setIndexTopic] = useState(null);

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
      headerRight: configHeaderRight,
      headerStyle: {
        backgroundColor: "#32A1B9",
        height: 70,
      },
    });
  }, [navigation]);

  const onPressTopicTitle = (id) => {
    navigation.navigate("VocabScreen", {
      topicId: id,
    });
  };

  const TopicLabel = (topic, idx) => {
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
                <View style={styles.ActiveTopic}>
                  <Typography>Tất cả</Typography>
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
              <AddTopic setListTopic={setListTopic} getAllTopic={getAllTopic} />
              <Box width="100%" height="80%" alignItems={"center"}>
                <View pb={4} width="90%" showsVerticalScrollIndicator={false}>
                  <ScrollView height="90%">
                    {listTopic.map((topic, index) => (
                      <TopicComponent
                        key={index}
                        topic={topic}
                        getAllTopic={getAllTopic}
                        onPressTopicTitle={onPressTopicTitle}
                      />
                    ))}
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
