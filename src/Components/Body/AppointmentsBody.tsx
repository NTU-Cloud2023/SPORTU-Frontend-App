import { useContext, useEffect, useMemo, useState } from 'react';
import AppointmentListItem from '../AppointmentListItem';
import Gap from '../Gap';
import LeftSubTitle from '../Title/LeftSubTitle';
import LeftTitle from '../Title/LeftTitle';
import './appointmentsBody.scss';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import axios from 'axios';
import { Appointment, AppointmentAPIResponse, FieldAPIResponse } from '../../API/APIInterface';
import { useNavigate } from 'react-router-dom';
import { CheckInCase, getCheckInCases } from '../../Storage/firebase';

type AppointmentStatus = 'success' | 'finished' | 'undone'

interface UpdatedAppointment extends Appointment {
    fieldDetails: FieldAPIResponse,
    status: AppointmentStatus
}

const AppointmentsBody = () => {
    const {
        user,
        fields,
        fetchingFields,
        fetchFields
    } = useContext(GlobDataContext);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [updatedAppointments, setUpdatedAppointments] = useState<UpdatedAppointment[]>([]);
    const [fetching, setFetching] = useState(false);
    const [checkInCases, setCheckInCases] = useState<CheckInCase[]>([]);

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

    const mapFieldDetails = (fieldId: number) => {
        return fields.find((f) => f.id === fieldId);
    };

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

    return (
        <div className="appointment-body">
            <div className="wrapper">
                <LeftTitle title="我的預約紀錄" />
                <Gap h="2rem" />
                <LeftSubTitle
                    title="預約成功"
                    color="primary"
                />
                <Gap h="0.6rem" />
                <div className="appointment-list">
                    {
                        updatedAppointments.map((ap, idx) => {
                            return ap.status === 'success' ? (
                                <div
                                    onClick={() => navigate(`/field-details/${ap.CourtID}`)}
                                    key={`appointment-list-item__${idx}__success`}
                                >
                                    <AppointmentListItem
                                        field={ap.fieldDetails}
                                        timestamp={+ap.Timestamp}
                                        addCalendarIcon={true}
                                        deleteIcon={false}
                                        key={`appointment-list-item__${idx}`}
                                    />
                                </div>
                            ) : '';
                        })
                    }
                    <div className="empty-check">
                        目前沒有即將開始的預約
                    </div>
                </div>
                <Gap h="3rem" />
                <LeftSubTitle title="完成報到" />
                <Gap h="0.6rem" />
                <div className="appointment-list">
                    {
                        updatedAppointments.map((ap, idx) => {
                            return ap.status === 'finished' ? (
                                <div
                                    onClick={() => navigate(`/field-details/${ap.CourtID}`)}
                                    key={`appointment-list-item__${idx}__finished`}
                                >
                                    <AppointmentListItem
                                        field={ap.fieldDetails}
                                        timestamp={+ap.Timestamp}
                                        addCalendarIcon={true}
                                        deleteIcon={false}
                                    />
                                </div>

                            ) : '';
                        })
                    }
                    <div className="empty-check">
                        目前沒有預約紀錄
                    </div>
                </div>
                <Gap h="2rem" />
                <LeftSubTitle
                    title="未報到"
                    color="danger"
                />
                <Gap h="0.6rem" />
                <div className="appointment-list">
                    {
                        updatedAppointments.map((ap, idx) => {
                            return ap.status === 'undone' ? (
                                <div
                                    onClick={() => navigate(`/field-details/${ap.CourtID}`)}
                                    key={`appointment-list-item__${idx}__undone`}
                                >
                                    <AppointmentListItem
                                        field={ap.fieldDetails}
                                        timestamp={+ap.Timestamp}
                                        addCalendarIcon={false}
                                        deleteIcon={false}
                                    />
                                </div>
                            ) : '';
                        })
                    }
                    <div className="empty-check">
                        目前沒有未報到的預約
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsBody;