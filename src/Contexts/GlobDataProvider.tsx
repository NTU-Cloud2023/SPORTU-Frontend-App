import React, { useState, ReactElement } from 'react';
import { DistanceAPIResponse, FieldAPIResponse, SportAPIResponse, UserAPIResponse } from '../API/APIInterface';
import { apiResponseProxy } from '../API/apiResponseProxy';
import axios, { AxiosResponse } from 'axios';
import getCurrentCoords from '../utils/getCurrentCoords';
import { delay } from '../utils';

const default_user: UserAPIResponse = {
    success: false,
    data: undefined
};

export interface UpdatedFieldData extends FieldAPIResponse {
    distance: DistanceAPIResponse
}

export const GlobDataContext = React.createContext(
    {
        sports: [] as SportAPIResponse[],
        fields: [] as UpdatedFieldData[],
        user: default_user,
        fetchSports: () => {},
        fetchingSports: false,
        fetchFields: () => {},
        fetchingFields: false,
        fetchUser: (account: string) => (new Promise<UserAPIResponse>(() => {})),
        fetchingUser: false
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

    const updateFields = async (fields: UpdatedFieldData[]) => {
        const location = await getCurrentCoords();
        // const promises: Promise<AxiosResponse<DistanceAPIResponse>>[] = [];
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const res = await axios<DistanceAPIResponse>({
                method: 'GET',
                url: `https://admin.chillmonkey.tw/v1/spaces/${field.id}/distance?lat=${location.latitude}&lng=${location.longitude}`
            });
            setFields((_fields) => {
                _fields[i] = {
                    ..._fields[i],
                    distance: res.data
                };
                return _fields;
            });
            // promises.push(axios<DistanceAPIResponse>({
            //     method: 'GET',
            //     url: `https://admin.chillmonkey.tw/v1/spaces/${field.id}/distance?lat=${location.latitude}&lng=${location.longitude}`
            // }));
        }
        // Promise.all(promises).then((responses) => {
        //     responses.forEach((res, idx) => {
        //         updatedFields[idx].distance = res.data;
        //     });
        //     setFields(updatedFields);
        //     setFetchingFields(false);
        // });
    };

    const fetchFields = async () => {
        if (fetchingFields === true) return;
        console.log('1');

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
            await updateFields(updatedFields);
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

    return (
        <GlobDataContext.Provider
            value={{
                sports,
                fields,
                user,
                fetchSports,
                fetchingSports,
                fetchFields,
                fetchingFields,
                fetchUser,
                fetchingUser
            }}
        >
            {children}
        </GlobDataContext.Provider>
    );
};

export default GlobDataProvider;