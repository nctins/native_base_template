import React, { useContext, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import IconAwesome from "@expo/vector-icons/FontAwesome";
import Typography from "../components/Typography";
import { AxiosContext } from "../contexts/AxiosContext";
import MeansOfVocabularyEdit from "../components/MeansOfVocabularyEdit";

const styles = {
  default: {
    flex: 1,
    backgroundColor: "#EDF3ED",
  },
  mainView: {
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  componentViewCenter: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  componentViewLeft: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  viewTitle: {
    width: "100%",
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    borderBottomWidth: 1,
  },
  textArea: {
    width: "95%",
    borderWidth: 1,
    textAlignVertical: "top",
    maxHeight: 90,
    borderRadius: 7,
    borderColor: "#E9B52F",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonConfig: {
    marginTop: 15,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "#22C7A9",
  },
};

const AddVocabScreen = ({ route, navigation }) => {
  const { word } = route.params;
  const [typeList, setTypeList] = useState(word.mean ? JSON.parse(word.mean) : []);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState(word.title);
  const [note, setNote] = useState(word.note);
  const { authAxios } = useContext(AxiosContext);
  const vocabId = word._id;
  

  const addTypeClick = () => {
    setTypeList((prev) => [...prev, { type: "", means: "" }]);
  };

  const onUpdate = () => {
    const data = {
      mean: JSON.stringify(typeList),
      note: note,
      title: title,
      image: image,
    };
    const uri = "/vocab/" + vocabId + "/updateVocab";
    // console.log(uri)
    authAxios
      .put(uri, data)
      .then((res) => {
        Alert.alert("SUCCESS", res.data.message, [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      })
      .catch((err) => {
          console.log(err)
          Alert.alert("ERROR", err.message);
      });
  };

  const getNameOfFile = (file) => {
    let arr = file.uri.split("/");
    return arr[arr.length - 1];
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(getNameOfFile(result));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.default}>
        <ScrollView style={styles.mainView}>
          <Icon
            name="arrowleft"
            size={30}
            onPress={() => navigation.goBack()}
          ></Icon>
          <View
            style={[
              styles.componentViewCenter,
              { marginTop: 15, minHeight: 50 },
            ]}
          >
            <Typography variant="smallTitle" style={{ color: "black" }}>
              Từ vựng:{" "}
            </Typography>
            <TextInput
              numberOfLines={1}
              style={{
                width: 180,
                borderColor: "black",
                borderWidth: 1,
                marginLeft: 10,
                paddingHorizontal: 5,
              }}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            ></TextInput>
          </View>
          <View
            style={[
              styles.componentViewLeft,
              { marginTop: 15, minHeight: 80, zIndex: 1 },
            ]}
          >
            <View style={styles.viewTitle}>
              <Typography
                variant="smallTitle"
                style={{ color: "black", marginLeft: 10 }}
              >
                Nghĩa của từ{" "}
              </Typography>
              <Icon
                name="pluscircle"
                size={30}
                style={{ marginRight: 10 }}
                onPress={addTypeClick}
              ></Icon>
            </View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 20,
                paddingBottom: 10,
                zIndex: 1,
              }}
            >
              {typeList.map((e, index) => (
                <MeansOfVocabularyEdit
                  key={index}
                  typeList={typeList}
                  setTypeList={setTypeList}
                  id={index}
                  initMean={e}
                />
              ))}
            </View>
          </View>
          <View style={[styles.componentViewLeft, { marginTop: 15 }]}>
            <View style={styles.viewTitle}>
              <Typography
                variant="smallTitle"
                style={{ color: "black", marginLeft: 10 }}
              >
                Ảnh minh hoạ
              </Typography>
            </View>
            <View
              style={{
                width: "100%",
                minHeight: 60,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                editable={false}
                numberOfLines={1}
                style={{
                  width: "80%",
                  height: 30,
                  borderWidth: 1,
                  paddingHorizontal: 5,
                }}
                value={image}
              ></TextInput>
              <IconAwesome
                name="image"
                size={37}
                style={{ color: "blue" }}
                onPress={pickImage}
              ></IconAwesome>
            </View>
          </View>
          <View style={[styles.componentViewLeft, { marginTop: 15 }]}>
            <View style={styles.viewTitle}>
              <Typography
                variant="smallTitle"
                style={{ color: "black", marginLeft: 10 }}
              >
                Ghi chú
              </Typography>
            </View>
            <View
              style={{
                width: "100%",
                height: 110,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TextInput
                multiline={true}
                numberOfLines={5}
                style={styles.textArea}
                value={note}
                onChangeText={(text) => {
                  setNote(text);
                }}
              ></TextInput>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Pressable
              style={styles.buttonConfig}
              onPress={() => {
                onUpdate();
              }}
            >
              <Typography variant="text">Lưu</Typography>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default AddVocabScreen;
