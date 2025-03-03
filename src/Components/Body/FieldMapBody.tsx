import { useContext, useEffect, useState } from 'react';
import './fieldMapBody.scss';
import GoogleMap from 'google-maps-react-markers';
import { defaultCoords } from '../../utils/getCurrentCoords';
import { GlobDataContext, UpdatedFieldData } from '../../Contexts/GlobDataProvider';
import FieldCardPopUpReadOnly from '../PopUp/FieldCardPopUpReadOnly';


const FieldMapBody = () => {
    const [popupField, setPopupField] = useState<UpdatedFieldData|undefined>(undefined);
    const [popUpStatus, setPopupStatus] = useState(false);
    const {
        fields,
        fetchFields,
        fetchingFields,
        updateField,
        googleMapAPIKey,
        fetchGoogleMapAPIKey
    } = useContext(GlobDataContext);

    useEffect(() => {
        if (fields.length === 0 && fetchingFields === false) {
            fetchFields();
        }
    }, []);

    useEffect(() => {
        fields.forEach((f) => {
            if (isNaN(f.distance.distance)) {
                updateField(f);
            }
        });
    }, [fields]);

    useEffect(() => {
        if (googleMapAPIKey === undefined) {
            fetchGoogleMapAPIKey();
        }
    }, [googleMapAPIKey]);

    const AnyReactComponent = (props: any) => (
        <div onClick={props.onClick}>
            <div
                className="d-block icon pin xl full mr-0"
                style={{
                    transform: 'translate(-50%, -100%)'
                }}
            >
            </div>
        </div>
    );

    return (
        <div className="map-body">
            {
                googleMapAPIKey ? (
                    <GoogleMap
                        apiKey={googleMapAPIKey}
                        defaultZoom={15}
                        mapMinHeight="calc(100vh - 150px)"
                        defaultCenter={{
                            lat: defaultCoords.latitude,
                            lng: defaultCoords.longitude
                        }}
                    >
                        {
                            fields.map((f, idx) => (
                                <AnyReactComponent
                                    lat={+f.latitude}
                                    lng={+f.longitude}
                                    onClick={() => {
                                        setPopupField(f);
                                        setPopupStatus(true);
                                    }}
                                    key={`field_map_marker_${idx}`}
                                />
                            ))
                        }
                    </GoogleMap>
                ) : ''
            }

            {
                (popUpStatus && popupField) ? (
                    <FieldCardPopUpReadOnly
                        field={popupField}
                        closePopup={() => setPopupStatus(false)}
                    />
                ) : ''
            }
        </div>
    );
};

export default FieldMapBody;