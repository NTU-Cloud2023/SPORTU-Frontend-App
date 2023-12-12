import React, { Dispatch, useState } from 'react';
import InputBar from '../InputBar';
import BodyTitle from '../Title/BodyTitle';
import './bookBody.scss';
import Button from '../Button';
import { textMap } from '../../i18n/textMap';

const BookBody = () => {
    const [type, setType] = useState<BallType>('');

    return (
        <div className="book-body">
            <div className="wrapper">
                <BodyTitle title={textMap.book_title} />
                <InputBar
                    inputText={type}
                    setInputText={setType as Dispatch<string>}
                    placeholder={textMap.field_placeholder}
                />
                <InputBar
                    inputText={type}
                    setInputText={setType as Dispatch<string>}
                    placeholder={textMap.field_placeholder}
                />
                <InputBar
                    inputText={type}
                    setInputText={setType as Dispatch<string>}
                    placeholder={textMap.field_placeholder}
                />
                <Button text={textMap.appointment} />
            </div>
        </div>
    );
};

export default BookBody;
