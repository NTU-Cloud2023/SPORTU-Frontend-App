import { useNavigate, useParams } from 'react-router-dom';
import { textMap } from '../../i18n/textMap';
import PillButton from '../PillButton';
import './fieldDetailsBody.scss';
import { useContext, useEffect, useState } from 'react';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import { FieldAPIResponse } from '../../API/APIInterface';
import { getDistance } from '../../utils';

const FieldDetailsBody = () => {
    const navigate = useNavigate();
    const param = useParams();
    const {
        fields
    } = useContext(GlobDataContext);
    const [fieldDetails, setFieldDetails] = useState<FieldAPIResponse|undefined>(undefined);
    const [dist, setDist] = useState<number>(NaN);

    useEffect(() => {
        if (param.id === undefined) navigate(-1);
        else {
            const data = fields.find((f) => f.id === parseInt(param.id || '') );
            setFieldDetails(data);
        }
    }, [fields]);

    useEffect(() => {
        if (fieldDetails !== undefined) {
            getDistance(
                +fieldDetails.longitude,
                +fieldDetails.latitude
            ).then((d) => setDist(d));
        }
    }, [fieldDetails]);

    return (
        <div className="field-details-body">
            <div className="wrapper">
                <PillButton
                    text={textMap.prev_page}
                    onClick={() => navigate(-1)}
                />

                <div className="field-img-container">
                    <div
                        className="field-img"
                        style={{
                            backgroundImage: `url(${fieldDetails?.pic})`
                        }}
                    >
                    </div>
                </div>
                <div className="default-content">
                    場館名稱: {fieldDetails?.name}
                </div>
                <div className="default-content">
                    場館地址: {fieldDetails?.address}
                    {/* <span className="disabled">廠商未提供</span> */}
                </div>
                <div className="default-content">
                    場館類別: {fieldDetails?.ball_type.cht_game_name}
                </div>
                <div className="default-content">
                    當前使用人數: {fieldDetails?.headcount} 人
                </div>
                <div className="default-content">
                    使用人數上限: {fieldDetails?.capacity}
                </div>
                <div className="default-content">
                    當前距離: {dist} 公尺
                </div>
                <div className="default-content">
                    單場區間: {fieldDetails?.eachtime} 小時
                    {/* <span className="disabled">廠商未提供</span> */}
                </div>
                <div className="sub-title">
                    該場地兩週內可預約時段
                </div>
                <div className="default-content">
                    <span className="disabled">廠商未提供</span>
                </div>
                <div className="sub-title">
                    地圖資訊
                </div>
                <div className="iframe-container">
                    <iframe
                        title="場館位置"
                        width="100%"
                        height="400"
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&q=${fieldDetails?.latitude},${fieldDetails?.longitude}&zoom=15`}
                    >
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default FieldDetailsBody;