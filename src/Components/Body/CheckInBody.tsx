import { useContext, useEffect, useMemo, useState } from 'react';
import './appointmentsBody.scss';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import axios from 'axios';
import { Appointment, AppointmentAPIResponse, FieldAPIResponse } from '../../API/APIInterface';
import { CheckInCase, addCheckInCase, getCheckInCases } from '../../Storage/firebase';
import './checkInBody.scss';
import BodyTitle from '../Title/BodyTitle';
import SelectInputBar, { SelectOption } from '../SelectInputBar';
import { localDateTimeString } from '../../utils';
import distanceFormat from '../../utils/distanceFormat';
import Button from '../Button';
import WarningContent from '../WarningContent';
import Cover from '../Cover';

type AppointmentStatus = 'success' | 'finished' | 'undone'

interface UpdatedAppointment extends Appointment {
    fieldDetails: FieldAPIResponse,
    status: AppointmentStatus
}

const CheckInBody = () => {
    const {
        user,
        fields,
        fetchingFields,
        fetchFields,
        updateField
    } = useContext(GlobDataContext);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [updatedAppointments, setUpdatedAppointments] = useState<UpdatedAppointment[]>([]);
    const [fetching, setFetching] = useState(false);
    const [bookFetching, setBookFetching] = useState(false);
    const [checkInCases, setCheckInCases] = useState<CheckInCase[]>([]);
    const [selectedVal, setSelectedVal] = useState('');

    const mapFieldDetails = (fieldId: number) => {
        return fields.find((f) => f.id === fieldId);
    };
    const mapApt = (TimestampUserID: string, CourtID: string) => {
        return updatedAppointments.find((apt) => {
            return apt.TimestampUserID === TimestampUserID
                        && apt.CourtID === CourtID;
        });
    };
    const selectedCourt = useMemo(() => {
        if (selectedVal.length === 0) return undefined;
        const courtId = +selectedVal.split('__')[1];
        return mapFieldDetails(courtId);
    }, [selectedVal]);
    const selectedApt = useMemo(() => {
        if (selectedVal.length === 0) return undefined;
        const ids = selectedVal.split('__');
        return mapApt(ids[0], ids[1]);
    }, [selectedVal]);
    const validHistory = useMemo<SelectOption[]>(() => {
        const arr: SelectOption[] = [];
        updatedAppointments.forEach((apt) => {
            const court = mapFieldDetails(+apt.CourtID);
            if (apt.status === 'success' && court) {
                arr.push({
                    text: court.name,
                    value: apt.TimestampUserID + '__' + apt.CourtID
                });
            }
        });
        return arr;
    }, [updatedAppointments, checkInCases]);

    const fetchAppointments = () => {
        if (fetching === true) return;

        setFetching(true);
        axios<AppointmentAPIResponse>({
            method: 'GET',
            url: `https://admin.chillmonkey.tw/v1/users/${user.data?.id}/history`
        }).then((res) => {
            setAppointments(res.data.data);
        }).catch(() => {
            setAppointments([]);
        }).finally(() => {
            setFetching(false);
        });
    };

    useEffect(() => {
        console.log('user check');
        console.log(appointments);
        console.log(user.success);
        if (appointments.length === 0 && user.success) {
            fetchAppointments();
        }
    }, [user]);

    useEffect(() => {
        if (fields.length === 0 && fetchingFields === false) {
            fetchFields();
        }

        getCheckInCases().then((res) => setCheckInCases(res));
    }, []);

    useEffect(() => {
        if (selectedCourt && isNaN(selectedCourt.distance.distance)) {
            updateField(selectedCourt);
        }
    }, [selectedCourt]);

    useEffect(() => {
        console.log('appointments updated');
        const current = new Date().getTime() - 3600000;
        const updated: UpdatedAppointment[] = [];
        console.log(appointments);
        appointments.forEach((ap) => {
            const f = mapFieldDetails(+ap.CourtID);
            if (f !== undefined && ap.Status !== 'Failed') {
                let status: AppointmentStatus = 'success';
                const match = checkInCases.find((ck) => (
                    ap.TimestampUserID === ck.TimestampUserID
                        && ap.CourtID === ck.CourtID
                ));
                if (match) status = 'finished';
                else if (+ap.Timestamp * 1000 < current) status = 'undone';
                updated.push({
                    ...ap,
                    Timestamp: (+ap.Timestamp * 1000).toString(),
                    fieldDetails: f,
                    status
                });
            }
        });
        setUpdatedAppointments(updated);
        console.log(updated);
    }, [appointments, fields, checkInCases]);

    return (
        <div className="check-in-body">
            <div className="wrapper">
                <BodyTitle title="報到" />
                {
                    validHistory.length === 0 ? (
                        fetching ? (
                            <div className="text-center mt-8">
                                <div className="icon loading xl"></div>
                            </div>
                        ) : (
                            <div className="text-center content">
                                目前沒有需報到的預約
                            </div>
                        )
                    ) : (
                        <SelectInputBar
                            options={validHistory}
                            setValue={setSelectedVal}
                        />
                    )
                }
                {
                    selectedCourt && selectedApt && validHistory.length > 0
                        ? isNaN(selectedCourt.distance.distance)
                            ? (
                                <div className="text-center content">
                                    {selectedCourt.name}<br />
                                    {localDateTimeString(+selectedApt.Timestamp)}<br />
                                    當前距離: <div className="icon loading"></div>公里
                                </div>
                            ) : (
                                <div className="text-center content">
                                    {selectedCourt.name}<br />
                                    {localDateTimeString(+selectedApt.Timestamp)}<br />
                                    當前距離: {distanceFormat(selectedCourt.distance.distance)}公里
                                </div>
                            )
                        : validHistory.length > 0
                            ? (
                                <div className="text-center content">
                                    請選擇欲報到的球場
                                </div>
                            ) : ''
                }

                <div className="my-14">
                    <WarningContent
                        content={'請注意\n未完成報到的帳戶\n將關閉預約功能'}
                    />
                </div>

                {
                    selectedApt
                        && selectedCourt
                        && validHistory.length > 0
                        && !isNaN(selectedCourt.distance.distance)
                        ? (
                            <div className="mt-8">
                                <Button
                                    text="立即報到"
                                    onClick={() => {
                                        setBookFetching(true);
                                        addCheckInCase(
                                            selectedApt?.TimestampUserID,
                                            selectedApt.CourtID
                                        ).finally(() => {
                                            setBookFetching(false);
                                            getCheckInCases().then((res) => setCheckInCases(res));
                                            alert('報到成功');
                                        });
                                    }}
                                />
                            </div>
                        ) : ''
                }

                {
                    bookFetching
                        ? (
                            <Cover />
                        ) : ''
                }
            </div>
        </div>
    );
};

export default CheckInBody;