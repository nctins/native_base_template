import {View, TextInput } from 'react-native';
import React from "react";
import SelectComponent from './Select';

const MeansOfVocabulary = () =>{

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
    return ( 
        <View style={{width:"100%",flexDirection:"row",marginTop:10,alignItems:'center'}}>
            <SelectComponent />
            <TextInput numberOfLines={1} style={[styles.TextInputConfig,{width:"50%"}]}></TextInput>
        </View>
     );
}
export default MeansOfVocabulary;