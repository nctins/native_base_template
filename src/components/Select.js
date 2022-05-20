import React, {useState} from 'react';
import { Select } from "native-base";

const SelectComponent = () =>{
    const [service, setService] = useState("");

    return ( 
        <Select value = {service} width="120" height="40px" marginTop="0" accessibilityLabel="Choose Service" placeholder="Choose type" mt={1}
        style= {{color: 'black'}}
        onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="Danh từ" value="n" />
            <Select.Item label="Động từ" value="v" />
            <Select.Item label="Tính từ" value="adj" />
            <Select.Item label="Trạng từ" value="adv" />
        </Select>
     );
}
export default SelectComponent;