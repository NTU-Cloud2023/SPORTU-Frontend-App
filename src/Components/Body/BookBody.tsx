import { useContext, useEffect, useState } from 'react';
import BodyTitle from '../Title/BodyTitle';
import './bookBody.scss';
import Button from '../Button';
import { textMap } from '../../i18n/textMap';
import PillButton from '../PillButton';
import { GlobDataContext, UpdatedFieldData } from '../../Contexts/GlobDataProvider';
import FieldCardM from '../FieldCardM';
import SelectableInputBar from '../SelectableInputBar';
import { OrderAPIResponse, SportAPIResponse } from '../../API/APIInterface';
import TimePicker from '../TimePicker';
import FieldCardPopUp from '../PopUp/FieldCardPopUp';
import SelectSportInputBar from '../SelectInputBar/SelectSportInputBar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { delay } from '../../utils';
import Cover from '../Cover';
import SortFieldsPopUp from '../PopUp/SortFieldsPopUp';

const BookBody = () => {
    const [openFieldListM, setOpenFieldListM] = useState(false);
    const [selectedSport, setSelectedSport] = useState<SportAPIResponse|undefined>(undefined);
    const [selectedField, setSelectedField] = useState<UpdatedFieldData|undefined>(undefined);
    const [popupField, setPopupField] = useState<UpdatedFieldData|undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<Date|null>(null);
    const [popUpStatus, setPopupStatus] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [selectedSportType, setSelectedSportType] = useState('all');
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        user,
        fields,
        sports,
        fetchSports,
        fetchingSports
    } = useContext(GlobDataContext);

    const book = async () => {
        if (fetching) return;
        setFetching(true);

        const cks = {
            sport: true,
            date: true,
            overdue: true,
            onHour: true,
            field: true,
            match: true
        };

        if (selectedSport === undefined) cks.sport = false;
        if (selectedTime === null) cks.date = false;
        else if ((selectedTime.getTime() - new Date().getTime()) < -3600000) cks.overdue = false;
        else if (selectedTime.getTime() % 3600000 !== 0) cks.onHour = false;
        if (selectedField === undefined) cks.field = false;
        else if (selectedField?.ball_type.type !== selectedSport?.type) cks.match = false;

        if (Object.values(cks).includes(false)) {
            alert(`
很抱歉，您輸入的資料有誤:
${cks.sport ? '' : '● 請選取運動類別\n'}${cks.date ? '' : '● 請選取運動時間\n'}${cks.overdue ? '' : '● 該時間已無法預約\n'}${cks.onHour ? '' : '● 運動時間需為整點\n'}${cks.field ? '' : '● 請選擇球場\n'}${cks.match ? '' : '● 所選的球場與球種不相同\n'}
請重新確認，如有問題請洽球場管理人員，謝謝
            `);
            setFetching(false);
        } else {
            await delay(Math.random() * 1000);

            axios<OrderAPIResponse>({
                method: 'POST',
                url: `https://admin.chillmonkey.tw/v1/spaces/${selectedField?.id}/reserve`,
                data: {
                    userId: user.data?.id,
                    timestamp: selectedTime!.getTime() / 1000
                }
            }).then((r) => {
                console.log(r.data.data.nickName);
                navigate('/book-success', {
                    state: {
                        field: selectedField,
                        timestamp: r.data.data.timestamp
                    }
                });
            }).catch((e) => {
                alert('你已經預約過該場次');
            }).finally(() => setFetching(false));

            // const iter = selectedField?.eachtime;
            // for (let i = 0; i < iter; i++) {}
        }
    };

    useEffect(() => {
        if (sports.length === 0 && fetchingSports === false) {
            fetchSports();
        }
    }, []);

    useEffect(() => {
        if (selectedField !== undefined
            && selectedField.ball_type.type !== selectedSport?.type) {
            setSelectedField(undefined);
        }
        if (selectedSport !== undefined) {
            setSelectedSportType(selectedSport?.game_name);
        }
    }, [selectedSport]);

    useEffect(() => {
        if (location.state !== null) {
            setSelectedField({...location.state.field});
            setSelectedTime(new Date(+location.state.timestamp * 1000));
            setSelectedSport(location.state.field.ball_type);
        }
    }, [location]);

    return (
        <div className="book-body">
            <div className="wrapper">
                <BodyTitle title={textMap.book_title} />
                <SelectSportInputBar
                    sports={sports}
                    setSport={setSelectedSport}
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
                    onClick={book}
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
