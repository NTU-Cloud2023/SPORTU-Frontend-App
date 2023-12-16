import { useContext, useEffect, useMemo, useRef } from 'react';
import './fieldCardM.scss';
import Gap from '../Gap';
import { GlobDataContext, UpdatedFieldData } from '../../Contexts/GlobDataProvider';
import useOnScreen from '../../Hooks/useOnScreen';
import distanceFormat from '../../utils/distanceFormat';

const FieldCardM = (field: UpdatedFieldData) => {
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
                <div className="text-pill primary">
                    <div className="icon loading"></div>
                </div>
            );
        } else {
            return (
                <div className="text-pill primary">
                    {
                        field.distance.distance
                            ? distanceFormat(field.distance.distance)
                            : '--'
                    }
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
            className="field-card-m"
            ref={ref}
        >
            <div className="card-body">
                <div className="flex">
                    <div className="text-pill dark text-sm">
                        {field.ball_type.cht_game_name}
                    </div>
                    <div className="title flex-1">
                        {field.name}
                    </div>
                </div>

                <Gap h="5px" />

                <div className="status-container">
                    <div className="text-pill dark">
                        <span className="text-sm">使用人數 </span>
                        <span className="underline">{field.headcount}/{field.capacity}</span>
                    </div>

                    {distanceComponent}
                </div>
            </div>
        </div>
    );
};

export default FieldCardM;