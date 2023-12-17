import React, { useState, ReactElement } from 'react';
import { DistanceAPIResponse, FieldAPIResponse, SportAPIResponse, UserAPIResponse } from '../API/APIInterface';
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
        sports: [] as SportAPIResponse[],
        fields: [] as UpdatedFieldData[],
        user: default_user,
        fetchSports: () => {},
        fetchingSports: false,
        fetchFields: () => {},
        fetchingFields: false,
        updateField: (field: UpdatedFieldData) => {},
        fetchUser: (account: string) => (new Promise<UserAPIResponse>(() => {})),
        fetchingUser: false,
        doLogout: () => {},
        sortFields: (by: SortTypes) => {}
    }
);

const GlobDataProvider = ({ children }:{
    children: ReactElement
}) => {
    const [sports, setSports] = useState<SportAPIResponse[]>([]);
    const [fields, setFields] = useState<UpdatedFieldData[]>([]);
    const [user, setUser] = useState<UserAPIResponse>(default_user);
    const [fetchingSports, setFetchingSports] = useState(false);
    const [fetchingFields, setFetchingFields] = useState(false);
    const [fetchingUser, setFetchingUser] = useState(false);

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
                sports,
                fields,
                user,
                fetchSports,
                fetchingSports,
                fetchFields,
                updateField,
                fetchingFields,
                fetchUser,
                fetchingUser,
                doLogout,
                sortFields
            }}
        >
            {children}
        </GlobDataContext.Provider>
    );
};

export default GlobDataProvider;