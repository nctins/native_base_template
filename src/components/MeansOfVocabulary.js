import {View, TextInput } from 'react-native';
import React from "react";
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

const MeansOfVocabulary = ({typeList,setTypeList,id}) =>{
    const pressRemoveIcon = () =>{
        setTypeList(typeList.filter((prev,index) => index !== id));
    }

    return ( 
        <View style={{width:"100%",flexDirection:"row",marginTop:10,alignItems:'center'}}>
            <SelectComponent />
            <TextInput numberOfLines={1} style={[styles.TextInputConfig,{width:"50%"}]} placeholder="enter means"></TextInput>
            <IconAwesome 
                name='remove' 
                size={30} 
                style={{marginLeft:15}}
                onPress={pressRemoveIcon}    
            ></IconAwesome>
        </View>
     );
}
export default MeansOfVocabulary;