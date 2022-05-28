import React, {useState} from 'react';
import { Select } from "native-base";

const SelectComponent = ({meansList,setMeansList,id}) =>{
    const [Type, setType] = useState("");

    const onChangeSelect = (e) => {
        setMeansList(prev => prev.id === id ? {...prev,type:e}:prev);
        setType("");
        console.log(meansList);
    }

    return ( 
        <Select value = {Type} width="120" height="40px" marginTop="0" accessibilityLabel="Choose Type" placeholder="Choose type" mt={1}
        style= {{color: 'black'}}
        onValueChange={(e) => onChangeSelect(e)}>
            <Select.Item label="Danh từ" value="n" />
            <Select.Item label="Động từ" value="v" />
            <Select.Item label="Tính từ" value="adj" />
            <Select.Item label="Trạng từ" value="adv" />
        </Select>
     );
}
export default SelectComponent;