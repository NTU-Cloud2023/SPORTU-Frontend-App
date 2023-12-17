import { useContext, useEffect, useRef, useState } from 'react';
import './fieldMapBody.scss';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { defaultCoords } from '../../utils/getCurrentCoords';
import { GlobDataContext, UpdatedFieldData } from '../../Contexts/GlobDataProvider';
import FieldCardPopUpReadOnly from '../PopUp/FieldCardPopUpReadOnly';


const mapContainerStyle = {
    width: '100vw',
    height: 'calc(100vh - 67px)'
};

const FieldMapBody = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [popupField, setPopupField] = useState<UpdatedFieldData|undefined>(undefined);
    const [popUpStatus, setPopupStatus] = useState(false);
    const {
        fields,
        fetchFields,
        fetchingFields,
        updateField
    } = useContext(GlobDataContext);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
        libraries: ['places']
    });

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

    return (
        <div className="map-body">
            {
                isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={15}
                        center={{
                            lat: defaultCoords.latitude,
                            lng: defaultCoords.longitude
                        }}
                    >
                        {
                            fields.map((f, idx) => (
                                <Marker
                                    position={{
                                        lat: +f.latitude,
                                        lng: +f.longitude
                                    }}
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