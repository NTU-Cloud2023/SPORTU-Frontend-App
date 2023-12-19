import SecondaryTitle from '../Title/SecondaryTitle';
import { textMap } from '../../i18n/textMap';
import './fieldListBody.scss';
import FieldCard from '../FieldCard';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import useOnScreen from '../../Hooks/useOnScreen';

export interface NearByBodyProps {
    lazyLoadAmount?: number
}

const NearByBody = ({
    lazyLoadAmount=-1
}: NearByBodyProps) => {

    const {
        fetchFields,
        fetchingFields,
        fields
    } = useContext(GlobDataContext);
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);
    const [isFetching, setIsFetching] = useState(false);
    const [current, setCurrent] = useState(lazyLoadAmount);
    const showFields = useMemo(() => {
        if (lazyLoadAmount === -1) return [...fields];
        else {
            return [...fields.slice(0, current)];
        }
    }, [fields, current]);

    useEffect(() => {
        if (fields.length > 0) {
            if (current >= (fields.length + lazyLoadAmount)) {
                setCurrent(-1);
            } else if (isVisible === true && !isFetching && current !== -1) {
                setIsFetching(true);
                setTimeout(() => {
                    setCurrent((x) => x + lazyLoadAmount);
                    setIsFetching(false);
                }, (Math.random() * 0.5 + 0.5) * 1500);
            }
        }
    }, [isVisible]);

    useEffect(() => {
        if (fields.length === 0 && fetchingFields === false) {
            fetchFields();
        }
    }, []);

    return (
        <div className="field-list-body in-home-page">
            <div className="wrapper">
                <SecondaryTitle title={textMap.near_field_title} />

                {
                    showFields.map((field) => (
                        <FieldCard
                            field={{...field}}
                            key={field.id}
                        />
                    ))
                }

                <div
                    className="lazy-load-trigger flex justify-center"
                    ref={ref}
                    style={{ height: '3rem' }}
                >
                    {
                        isFetching ? (
                            <div className="icon loading xl d-block"></div>
                        ) : ''
                    }
                </div>
            </div>
        </div>
    );
};

export default NearByBody;