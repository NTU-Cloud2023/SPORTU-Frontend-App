import { useNavigate, useParams } from 'react-router-dom';
import { textMap } from '../../i18n/textMap';
import PillButton from '../PillButton';
import './fieldDetailsBody.scss';
import { useContext, useEffect, useState } from 'react';
import { GlobDataContext, UpdatedFieldData } from '../../Contexts/GlobDataProvider';

const FieldDetailsBody = () => {
    const navigate = useNavigate();
    const param = useParams();
    const {
        fields,
        fetchingFields,
        fetchFields,
        updateField,
        googleMapAPIKey,
        fetchGoogleMapAPIKey
    } = useContext(GlobDataContext);
    const [fieldDetails, setFieldDetails] = useState<UpdatedFieldData|undefined>(undefined);

    useEffect(() => {
        if (param.id === undefined) navigate(-1);
        else {
            const data = fields.find((f) => f.id === parseInt(param.id || '') );
            setFieldDetails(data);
        }
    }, [fields]);

    useEffect(() => {
        if (fieldDetails && isNaN(fieldDetails.distance.distance)) {
            updateField(fieldDetails);
        }
    }, [fieldDetails]);

    useEffect(() => {
        if (fields.length === 0 && fetchingFields === false) {
            fetchFields();
        }
    }, []);

    useEffect(() => {
        if (googleMapAPIKey === undefined) {
            fetchGoogleMapAPIKey();
        }
    }, [googleMapAPIKey]);

    return (
        <div className="field-details-body">
            <div className="wrapper">
                <div className="flex">
                    <PillButton
                        text={textMap.prev_page}
                        onClick={() => navigate(-1)}
                    />
                    <div className="ml-auto">
                        <PillButton
                            text="立即導航"
                            type="nav"
                            onClick={() => window.open(fieldDetails?.nav_url, 'blank')}
                        />
                    </div>
                </div>

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
                    當前距離:&nbsp;
                    {
                        fieldDetails && !isNaN(fieldDetails.distance.distance) ? (
                            <span>
                                {fieldDetails?.distance.distance} 公尺
                            </span>
                        ) : (
                            <div className="icon loading"></div>
                        )
                    }
                </div>
                <div className="default-content">
                    導航時間:&nbsp;
                    {
                        fieldDetails && !isNaN(fieldDetails.distance.distance) ? (
                            <span>
                                {Math.ceil(fieldDetails?.distance.duration / 60)} 分鐘
                            </span>
                        ) : (
                            <div className="icon loading"></div>
                        )
                    }
                </div>
                {/* <div className="default-content">
                    單場區間: {fieldDetails?.eachtime} 小時
                    <span className="disabled">廠商未提供</span>
                </div> */}
                {/* <div className="sub-title">
                    該場地兩週內可預約時段
                </div>
                <div className="default-content">
                    <span className="disabled">廠商未提供</span>
                </div> */}
                <div className="sub-title">
                    地圖資訊
                </div>
                {
                    googleMapAPIKey ? (
                        <div className="iframe-container">
                            <iframe
                                title="場館位置"
                                width="100%"
                                height="400"
                                src={`https://www.google.com/maps/embed/v1/place?key=${googleMapAPIKey}&q=${fieldDetails?.latitude},${fieldDetails?.longitude}&zoom=15`}
                            >
                            </iframe>
                        </div>
                    ) : ''
                }
            </div>
        </div>
    );
};

export default FieldDetailsBody;