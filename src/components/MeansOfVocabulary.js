import {View, TextInput } from 'react-native';
import React, { useState } from "react";
import SelectComponent from './Select';
import IconAwesome from '@expo/vector-icons/FontAwesome';

const styles = {
    TextInputConfig:{
        borderWidth:1,
        marginLeft:10,
        borderRadius:5,
        paddingHorizontal:10,
        paddingVertical:2,
        height: 40
    }
}

const MeansOfVocabulary = ({meansList,setMeansList,id}) =>{
    const [textInput,setTextInput] = useState("");

    const onPressDeleteMeansIcon = () => {
        setMeansList(meansList.filter(means => means.id !== id));
    }

    const onChangeTextInput = (e) => {
        setMeansList(prev => prev.id === id ? {...prev,means:e}:prev);
        setTextInput("");
    }

    return ( 
        <View style={{width:"100%",flexDirection:"row",marginTop:10,alignItems:'center'}}>
            <SelectComponent meansList={meansList} setMeansList = {setMeansList} id={means.id} />
            <TextInput numberOfLines={1} style={[styles.TextInputConfig,{width:"50%"}]} placeholder="enter means" value={textInput} onChange={(e) => onChangeTextInput(e)}></TextInput>
            <IconAwesome 
                name='remove' 
                size={30} 
                style={{marginLeft:15}}
                onPress={onPressDeleteMeansIcon}    
            ></IconAwesome>
        </View>
     );
}
export default MeansOfVocabulary;