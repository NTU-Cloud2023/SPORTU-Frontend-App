import { useContext, useEffect, useMemo, useRef } from 'react';
import './fieldCard.scss';
import { textMap } from '../../i18n/textMap';
import { useNavigate } from 'react-router-dom';
import { GlobDataContext, UpdatedFieldData } from '../../Contexts/GlobDataProvider';
import useOnScreen from '../../Hooks/useOnScreen';
import distanceFormat from '../../utils/distanceFormat';
import Button from '../Button';

export interface FieldCardProps {
    field: UpdatedFieldData,
    onClick?: () => void
}

const FieldCard = ({
    field,
    onClick
}: FieldCardProps) => {
    const navigate = useNavigate();
    const { updateField } = useContext(GlobDataContext);
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);

    useEffect(() => {
        if (isVisible && isNaN(field.distance.distance)) {
            updateField(field);
        }
    }, [isVisible]);

    const distanceComponent = useMemo(() => {
        if (!field.distance.distance || !field.distance.duration) {
            return (
                <div className="distance-tag">
                    <div className="icon loading"></div>
                </div>
            );
        } else {
            return (
                <div className="distance-tag">
                    <div className="icon walking"></div>
                    {distanceFormat(field.distance.distance)}
                    <span className="text-sm">公里</span>
                    <span className="text-sm">({
                        field.distance.duration
                            ? Math.ceil(field.distance.duration / 60)
                            : '--'
                    }分鐘)
                    </span>
                </div>
            );
        }
    }, [field]);

    return (
        <div
            className="field-card"
            ref={ref}
        >
            <div className="card-body">
                <div className="field-img-container">
                    {distanceComponent}
                    <div
                        className="field-img"
                        style={{
                            backgroundImage: `url(${field?.pic})`
                        }}
                    >
                    </div>
                </div>

                <div className="status-container">
                    <div className="text-pill dark">
                        {field.ball_type.cht_game_name}
                    </div>
                    <div className="text-pill dark">
                        使用人數{field.headcount}/{field.capacity}
                    </div>
                    {
                        onClick === undefined ? (
                            <div
                                className="text-pill primary"
                                onClick={() => navigate('/field-details/' + field.id)}
                            >

                                {textMap.detailed_information}
                            </div>
                        ) : ''
                    }
                </div>

                <div className="field-title">
                    {field.name}
                </div>
                <div className="field-address">
                    <div className="icon nav"></div>{field.address}
                </div>
                <div className="field-position">
                    <div className="icon pin"></div>{field.latitude}, {field.longitude}
                </div>

                {
                    onClick !== undefined ? (
                        <div className="mt-4">
                            <Button
                                text="選擇球場"
                                onClick={onClick}
                            />
                        </div>
                    ) : ''
                }
            </div>
        </div>
    );
};

export default FieldCard;