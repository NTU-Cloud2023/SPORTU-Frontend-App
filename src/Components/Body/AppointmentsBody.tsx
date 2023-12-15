import { useContext, useEffect } from 'react';
import AppointmentListItem from '../AppointmentListItem';
import Gap from '../Gap';
import LeftSubTitle from '../Title/LeftSubTitle';
import LeftTitle from '../Title/LeftTitle';
import './appointmentsBody.scss';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';


const AppointmentsBody = () => {
    const {
        fields
    } = useContext(GlobDataContext);

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
                        fields.map((f, idx) => (
                            <AppointmentListItem
                                field={f}
                                timestamp={1}
                                addCalendarIcon={true}
                                deleteIcon={true}
                                key={`appointment-list-item__${idx}`}
                            />
                        ))
                    }
                </div>
                <Gap h="2rem" />
                <LeftSubTitle title="報到完成" />
                <Gap h="2rem" />
                <LeftSubTitle
                    title="未報到"
                    color="danger"
                />
            </div>
        </div>
    );
};

export default AppointmentsBody;