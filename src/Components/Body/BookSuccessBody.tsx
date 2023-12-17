import { useLocation, useNavigate } from 'react-router-dom';
import BodyTitle from '../Title/BodyTitle';
import './bookSuccessBody.scss';
import { useEffect, useMemo } from 'react';
import Button from '../Button';
import { format } from 'date-fns';
import { UpdatedFieldData } from '../../Contexts/GlobDataProvider';

const BookSuccessBody = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const message = useMemo(() => {
        if (location.state === null) return '資料異常，請洽管理人員';
        return `場館: ${location.state.field.name || '--'}
時間: ${format(new Date(+location.state.timestamp * 1000), 'yyyy年MM月dd日 HH:mm')}
預約成功
`;
    }, [location]);
    const field = useMemo<UpdatedFieldData|null>(() => {
        if (location.state === null) return null;
        else return {...location.state.field};
    }, [location]);

    const addToGoogleCalendar = () => {
        const timestamp = +location.state.timestamp * 1000;

        const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${field!.name.replace(' ', '+')}&dates=${format(new Date(timestamp), 'yyyyMMdd\'T\'HHmmss\'Z\'')}&details=${encodeURIComponent(field!.nav_url)}`;
        window.open(url, 'blank');
    };

    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <div className="book-success-body">
            <div className="wrapper">
                <BodyTitle
                    title={
                        location.state ? '預約成功' : '預約失敗'
                    }
                />
                <div className="content mt-8 mb-16">
                    {message}
                </div>
                {
                    location.state ? (
                        <>
                            <Button
                                text="查看場地細節"
                                onClick={() => navigate(`/field-details/${field?.id}`)}
                            />
                            <Button
                                text="加入 Google 行事曆"
                                onClick={addToGoogleCalendar}
                            />
                        </>
                    ) : (
                        <Button
                            text="回首頁"
                            onClick={() => navigate('/home')}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default BookSuccessBody;