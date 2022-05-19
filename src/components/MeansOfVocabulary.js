import {View, TextInput ,TouchableWithoutFeedback } from 'react-native';
import DropDownComponent from './DropDown';
import React from "react";

const MeansOfVocabulary = (props) =>{

    const styles = {
        TextInputConfig:{
            borderWidth:1,
            marginLeft:10,
            borderRadius:5,
            paddingHorizontal:10,
            paddingVertical:10
        }
    }
    return ( 
        <View style={{width:"100%",flexDirection:"row",marginTop:10,zIndex:props.zIndex}}>
            <DropDownComponent containerStyle = {{width:"40%"}} style = {{zIndex: props.zIndex}}/>
            <TextInput numberOfLines={1} style={[styles.TextInputConfig,{width:"50%"}]}></TextInput>
        </View>
     );
}
export default MeansOfVocabulary;