import { Dispatch, useContext, useEffect, useMemo, useState } from 'react';
import InputBar from '../InputBar';
import BodyTitle from '../Title/BodyTitle';
import './bookBody.scss';
import Button from '../Button';
import { textMap } from '../../i18n/textMap';
import PillButton from '../PillButton';
import Gap from '../Gap';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import FieldCardM from '../FieldCardM';
import SelectInputBar, { SelectOption } from '../SelectInputBar';
import SelectableInputBar from '../SelectableInputBar';
import { FieldAPIResponse } from '../../API/APIInterface';
import TimePicker, { CusTimeRange } from '../TimePicker';

const BookBody = () => {
    const [type, setType] = useState<BallType>('');
    const [openFieldListM, setOpenFieldListM] = useState(false);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedField, setSelectedField] = useState<FieldAPIResponse|undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<CusTimeRange>({
        startTime: '',
        endTime: ''
    });
    const {
        fields,
        sports,
        fetchSports,
        fetchingSports
    } = useContext(GlobDataContext);
    const sportOptions = useMemo<SelectOption[]>(() => {
        const opts = sports.map<SelectOption>((sport) => ({
            text: sport.cht_game_name,
            value: sport.type.toString()
        }));

        return opts;
    }, [sports]);

    useEffect(() => {
        if (sports.length === 0 && fetchingSports === false) {
            fetchSports();
        }
    }, [fields]);

    return (
        <div className="book-body">
            <div className="wrapper">
                <BodyTitle title={textMap.book_title} />
                <SelectInputBar
                    options={sportOptions}
                    setValue={setSelectedSport}
                    value={selectedSport}
                />
                <TimePicker
                    value={selectedTime}
                    setValue={setSelectedTime}
                />
                {/* <InputBar
                    inputText={type}
                    setInputText={setType as Dispatch<string>}
                    placeholder={textMap.field_placeholder}
                /> */}
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
