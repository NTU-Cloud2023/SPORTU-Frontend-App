import React, { Dispatch, useContext, useState } from 'react';
import InputBar from '../InputBar';
import BodyTitle from '../Title/BodyTitle';
import './bookBody.scss';
import Button from '../Button';
import { textMap } from '../../i18n/textMap';
import SelectableInputBar from '../SelectableInputBar';
import PillButton from '../PillButton';
import { useNavigate } from 'react-router-dom';
import Gap from '../Gap';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import FieldCardM from '../FieldCardM';

const BookBody = () => {
    const [type, setType] = useState<BallType>('');
    const [openFieldListM, setOpenFieldListM] = useState(false);
    const [openFieldCard, setOpenFieldCard] = useState(false);
    const [selectedFiledId, setSelectedFieldId] = useState<number>(NaN);
    const { fields } = useContext(GlobDataContext);
    const navigate = useNavigate();

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
                <SelectableInputBar
                    text={textMap.field_placeholder}
                    onClick={() => setOpenFieldListM(true)}
                />
                <Button text={textMap.appointment} />
            </div>

            {
                openFieldListM ? (
                    <div className="field-list-m">
                        <div className="container">
                            <div className="buttons-container">
                                <PillButton
                                    text={textMap.prev_page}
                                    onClick={() => setOpenFieldListM(false)}
                                />
                                <PillButton
                                    text={textMap.map_preview}
                                    type="map"
                                    onClick={() => {}}
                                    style={{margin: '0 1rem 0 auto'}}
                                />
                                <PillButton
                                    text={textMap.sorted_by}
                                    type="control"
                                    onClick={() => {}}
                                />
                            </div>

                            <Gap h="1rem" />

                            {
                                fields.map((f) => (
                                    <FieldCardM
                                        {...f}
                                        key={`field-card-m-${f.id}`}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ) : ''
            }
        </div>
    );
};

export default BookBody;
