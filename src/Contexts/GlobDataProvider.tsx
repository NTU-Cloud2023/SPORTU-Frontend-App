import React, { useState, ReactElement, useMemo } from 'react';
import { DistanceAPIResponse, FieldAPIResponse, GoogleMapKeyAPIResponse, NotificationAPIResponse, SportAPIResponse, UserAPIResponse } from '../API/APIInterface';
import { apiResponseProxy } from '../API/apiResponseProxy';
import axios from 'axios';
import getCurrentCoords from '../utils/getCurrentCoords';
import { delay } from '../utils';

const default_user: UserAPIResponse = {
    success: false,
    data: undefined
};

export interface UpdatedFieldData extends FieldAPIResponse {
    distance: DistanceAPIResponse
}

export type SortTypes = 'id' | 'distance' | 'time'

export const GlobDataContext = React.createContext(
    {
        notifications: [] as NotificationAPIResponse[],
        alerts: [] as NotificationAPIResponse[],
        sports: [] as SportAPIResponse[],
        fields: [] as UpdatedFieldData[],
        user: default_user,
        fetchNotifications: (userId: number) => {},
        fetchingNotifications: false,
        fetchSports: () => {},
        fetchingSports: false,
        fetchFields: () => {},
        fetchingFields: false,
        updateField: (field: UpdatedFieldData) => {},
        fetchUser: (account: string) => (new Promise<UserAPIResponse>(() => {})),
        fetchingUser: false,
        doLogout: () => {},
        sortFields: (by: SortTypes) => {},
        googleMapAPIKey: undefined as undefined|string,
        fetchGoogleMapAPIKey: () => (new Promise<undefined|string>(() => {})),
        readNotification: (id: number) => {},
        hasNewMessage: false
    }
);

const GlobDataProvider = ({ children }:{
    children: ReactElement
}) => {
    const [notifications, setNotifications] = useState<NotificationAPIResponse[]>([]);
    const [sports, setSports] = useState<SportAPIResponse[]>([]);
    const [fields, setFields] = useState<UpdatedFieldData[]>([]);
    const [user, setUser] = useState<UserAPIResponse>(default_user);
    const [googleMapAPIKey, setGoogleMapAPIKey] = useState<undefined|string>(undefined);
    const [fetchingNotifications] = useState(false);
    const [fetchingSports, setFetchingSports] = useState(false);
    const [fetchingFields, setFetchingFields] = useState(false);
    const [fetchingUser, setFetchingUser] = useState(false);
    const alerts = useMemo<NotificationAPIResponse[]>(() => {
        const filtered = notifications.filter((notification) => {
            const f3 = notification.message.slice(0, 3);
            const f7 = notification.message.slice(0, 7);
            if (notification.viewed === 0
                && (f3 === '提醒您'
                    || f7 === '訂單已成功處理')) return true;
            return false;
        });
        return filtered;
    }, [notifications]);
    const hasNewMessage = useMemo(() => {
        const ntf = notifications.find((n) => n.viewed === 0);
        return (ntf !== undefined);
    }, [notifications]);

    const readNotification = (id: number) => {
        axios({
            method: 'GET',
            url: `https://admin.chillmonkey.tw/v1/users/closemessage/${id}`
        });

        setNotifications((arr) => {
            const idx = arr.findIndex((notification) => notification.id === id);
            arr[idx].viewed = 1;
            return [...arr];
        });
    };

    const fetchNotifications = (userId: number) => {
        axios<NotificationAPIResponse[]>({
            method: 'GET',
            url: `https://admin.chillmonkey.tw/v1/users/${userId}/messages`
        }).then((res) => {
            setNotifications(res.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    const fetchGoogleMapAPIKey = () => (new Promise<string>((resolve, rej) => {
        axios<GoogleMapKeyAPIResponse>({
            method: 'GET',
            url: 'https://admin.chillmonkey.tw/v1/googlemapapi/apikey'
        }).then((res) => {
            const key = res.data.api_key;
            resolve(key);
            setGoogleMapAPIKey(key);
        }).catch(() => {
            rej();
            setGoogleMapAPIKey(undefined);
        });
    }));

    const sortFields = (by: SortTypes) => {
        const sorted: UpdatedFieldData[] = [...fields];
        sorted.sort((a, b) => {
            if (by === 'distance') {
                return (a.distance.distance - b.distance.distance);
            } else if (by === 'time') {
                return (a.distance.duration - b.distance.duration);
            } else if (by === 'id') {
                return (a.id - b.id);
            }
            return 0;
        });
        setFields([...sorted]);
    };

    const fetchSports = () => {
        if (fetchingSports === true) return;

        setFetchingSports(true);

        axios({
            method: 'GET',
            url: 'https://admin.chillmonkey.tw/v1/spaces/sports'
        }).then((res) => {
            console.log(res.data);

            setSports(res.data);
        }).catch(() => {
            setSports(apiResponseProxy.sports());
        }).finally(() => setFetchingSports(false));
    };

    const updateField = async (field: UpdatedFieldData) => {
        const location = await getCurrentCoords();
        const res = await axios<DistanceAPIResponse>({
            method: 'GET',
            url: `https://admin.chillmonkey.tw/v1/spaces/${field.id}/distance?lat=${location.latitude}&lng=${location.longitude}`
        });
        await delay(Math.random() * 500);
        setFields((_fields) => {
            const idx = _fields.findIndex((f) => f.id === field.id);
            _fields[idx].distance = res.data;
            return [..._fields];
        });
    };

    const fetchFields = async () => {
        if (fetchingFields === true) return;

        setFetchingFields(true);

        axios<FieldAPIResponse[]>({
            method: 'GET',
            url: 'https://admin.chillmonkey.tw/v1/spaces'
        }).then(async (res) => {
            console.log(res.data);
            const updatedFields: UpdatedFieldData[] = res.data.map((field) => ({
                ...field,
                distance: {distance: NaN, duration: NaN}
            }));
            setFields(updatedFields);
        }).finally(() => {
            setFetchingFields(false);
        });
    };

    const fetchUser = (account: string) => (new Promise<UserAPIResponse>((resolve, rej) => {
        if (fetchingUser === true) return;

        setFetchingUser(true);

        axios<UserAPIResponse>({
            method: 'GET',
            url: 'https://admin.chillmonkey.tw/v1/users/email/' + account
        }).then((res) => {
            console.log(res);
            if (res.data.success === false) {
                rej();
            } else {
                resolve(res.data);
                setUser(res.data);
            }
        }).catch(() => {
            setUser(default_user);
            rej();
        }).finally(() => {
            setFetchingUser(false);
        });
    }));

    const doLogout = () => {
        setUser(default_user);
        localStorage.removeItem('SPORTU_USER_ACCOUNT');
    };

    return (
        <GlobDataContext.Provider
            value={{
                hasNewMessage,
                alerts,
                notifications,
                sports,
                fields,
                user,
                fetchNotifications,
                fetchSports,
                fetchingSports,
                fetchFields,
                updateField,
                fetchingNotifications,
                fetchingFields,
                fetchUser,
                fetchingUser,
                doLogout,
                sortFields,
                googleMapAPIKey,
                fetchGoogleMapAPIKey,
                readNotification
            }}
        >
            {children}
        </GlobDataContext.Provider>
    );
};

export default GlobDataProvider;