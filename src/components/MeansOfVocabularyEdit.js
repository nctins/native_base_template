import { View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import SelectComponent from "./Select";
import IconAwesome from "@expo/vector-icons/FontAwesome";

const styles = {
  TextInputConfig: {
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    height: 40,
  },
};

const MeansOfVocabularyEdit = ({ typeList, setTypeList, id, initMean}) => {

  const [vocabType, setVocabType] = useState( initMean ? initMean.type : "");
  const [vocabMean, setVocabMean] = useState( initMean ? initMean.means : "");
  
  const pressRemoveIcon = () => {
    setTypeList(typeList.filter((prev, index) => index !== id));
  };

  const onChangeHandle = () => {
      let newTypeList = Array.from(typeList);
      newTypeList[id].means = vocabMean;
      newTypeList[id].type = vocabType;
      setTypeList(newTypeList);
  }

  useEffect(()=>{onChangeHandle()},[vocabMean, vocabType])

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
      }}
    >
      <SelectComponent vocabType={vocabType} setVocabType={setVocabType} />
      <TextInput
        numberOfLines={1}
        style={[styles.TextInputConfig, { width: "50%" }]}
        placeholder="Nhập nghĩa"
        value={vocabMean}
        onChangeText={(text)=>{setVocabMean(text)}}
      />
      <IconAwesome
        name="remove"
        size={30}
        style={{ marginLeft: 15 }}
        onPress={pressRemoveIcon}
      />
    </View>
  );
};
export default MeansOfVocabularyEdit;
