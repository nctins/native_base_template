import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';

const DropDownComponent = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("None");
    const [items, setItems] = useState([
        {label: 'None', value: 'None'},
        {label: 'Danh từ', value: 'n'},
        {label: 'Tính từ', value: 'adj'},
        {label: 'Trạng từ', value: 'adv'},
        {label: 'Động từ', value: 'v'},
    ]);

    return (
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        maxHeight={100}
        defaultValue= "None"

        containerStyle={props.containerStyle}
        
        style = {props.style}

        textStyle={{
            fontSize: 12
        }}

        disabledStyle={{
            opacity: 0.5
        }}
        
        />
    );
}
export default DropDownComponent