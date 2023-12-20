import { useContext, useState } from 'react';
import { GlobDataContext, UpdatedFieldData } from '../Contexts/GlobDataProvider';
import { OrderAPIResponse, SportAPIResponse } from '../API/APIInterface';
import { delay } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cks = {
    sport: true,
    date: true,
    overdue: true,
    onHour: true,
    field: true,
    match: true
};

const useAPI = () => {
    const current = new Date().getTime() - 3600000;
    const { user } = useContext(GlobDataContext);
    const navigate = useNavigate();
    const [fetching, setFetching] = useState(false);

    const book = async (
        selectedSport: SportAPIResponse|undefined,
        selectedTime: Date|null,
        selectedField: UpdatedFieldData|undefined
    ) => {
        if (fetching === true) return;
        setFetching(true);

        if (selectedSport === undefined) cks.sport = false;
        if (selectedTime === null) cks.date = false;
        else if (selectedTime.getTime() < current) cks.overdue = false;
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

            return axios<OrderAPIResponse>({
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
        }
    };

    return {
        book,
        fetching
    };
};

export default useAPI;