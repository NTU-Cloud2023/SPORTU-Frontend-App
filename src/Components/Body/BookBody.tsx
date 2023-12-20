import './bookBody.scss';
import { useContext, useEffect, useState } from 'react';
import BodyTitle from '../Title/BodyTitle';
import Button from '../Button';
import { textMap } from '../../i18n/textMap';
import PillButton from '../PillButton';
import { GlobDataContext, UpdatedFieldData } from '../../Contexts/GlobDataProvider';
import FieldCardM from '../FieldCardM';
import SelectableInputBar from '../SelectableInputBar';
import { SportAPIResponse } from '../../API/APIInterface';
import TimePicker from '../TimePicker';
import FieldCardPopUp from '../PopUp/FieldCardPopUp';
import SelectSportInputBar from '../SelectInputBar/SelectSportInputBar';
import { useLocation } from 'react-router-dom';
import Cover from '../Cover';
import SortFieldsPopUp from '../PopUp/SortFieldsPopUp';
import useAPI from '../../Hooks/useAPI';

const BookBody = () => {
    const [openFieldListM, setOpenFieldListM] = useState(false);
    const [selectedSport, setSelectedSport] = useState<SportAPIResponse|undefined>(undefined);
    const [selectedField, setSelectedField] = useState<UpdatedFieldData|undefined>(undefined);
    const [popupField, setPopupField] = useState<UpdatedFieldData|undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<Date|null>(null);
    const [popUpStatus, setPopupStatus] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [selectedSportType, setSelectedSportType] = useState('all');
    const { book, fetching } = useAPI();
    const location = useLocation();

    const {
        fields,
        sports,
        updateSportsSort,
        fetchFields,
        fetchingFields
    } = useContext(GlobDataContext);

    useEffect(() => {
        if (selectedSport !== undefined) {
            setSelectedSportType(selectedSport?.game_name);
        }
    }, [selectedSport]);

    useEffect(() => {
        if (location.state !== null) {
            updateSportsSort(location.state.field.ball_type.type);
            setSelectedField({...location.state.field});
            setSelectedTime(new Date(+location.state.timestamp * 1000));
        }
    }, [location]);

    useEffect(() => {
        if (fields.length === 0 && fetchingFields === false) {
            fetchFields();
        }
    }, []);

    const clearField = () => {
        setSelectedField(undefined);
    };

    return (
        <div className="book-body">
            <div className="wrapper">
                <BodyTitle title={textMap.book_title} />
                <SelectSportInputBar
                    sports={sports}
                    setSport={setSelectedSport}
                    clearField={clearField}
                />
                <TimePicker
                    value={selectedTime}
                    setValue={setSelectedTime}
                />
                <SelectableInputBar
                    text={selectedField ? selectedField.name : textMap.field_placeholder}
                    onClick={() => setOpenFieldListM(true)}
                />
                <Button
                    text={textMap.appointment}
                    onClick={() => book(selectedSport, selectedTime, selectedField)}
                />
            </div>

            {
                openFieldListM ? (
                    <div className="field-list-m">
                        <div className="container">
                            <div className="buttons-container">
                                <PillButton
                                    text={textMap.prev_page}
                                    onClick={() => {
                                        setOpenSort(false);
                                        setOpenFieldListM(false);
                                    }}
                                />
                                <PillButton
                                    text={textMap.sorted_by}
                                    type="control"
                                    onClick={() => setOpenSort(true)}
                                    style={{margin: '0 1rem 0 auto'}}
                                />
                            </div>
                        </div>

                        <div className="scroll-area">
                            {
                                fields.map((f) => (
                                    f.ball_type.game_name === selectedSportType ? (
                                        <div
                                            onClick={() => {
                                                setPopupField(f);
                                                setPopupStatus(true);
                                            }}
                                            key={`field-card-m-${f.id}`}
                                        >
                                            <FieldCardM {...f} />
                                        </div>
                                    ) : ''
                                ))
                            }
                            <div className="empty-check">
                                沒有符合條件的球場
                            </div>
                        </div>
                    </div>
                ) : ''
            }

            {
                (popUpStatus && popupField) ? (
                    <FieldCardPopUp
                        field={popupField}
                        setField={setSelectedField}
                        closeSelection={() => setPopupStatus(false)}
                        closePopup={() => setOpenFieldListM(false)}
                    />
                ) : ''
            }

            {
                fetching ? (
                    <Cover />
                ) : ''
            }

            {
                openSort
                    ? (
                        <SortFieldsPopUp
                            selectedSport={selectedSportType}
                            setSelectedSport={setSelectedSportType}
                            closePopup={() => setOpenSort(false)}
                            filter={false}
                        />
                    ) : ''
            }
        </div>
    );
};

export default BookBody;
