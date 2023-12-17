import { useState } from 'react';
import InputBar from '.';

const InputBarWrap = ({placeholder=''}: {placeholder?: string}) => {
    const [val, change] = useState('');

    return (
        <InputBar
            inputText={val}
            setInputText={change}
            placeholder={placeholder}
        />
    );
};

export default InputBarWrap;