import React, { useState, ReactElement } from 'react';
import { FieldAPIResponse, SportAPIResponse, UserAPIResponse } from '../API/APIInterface';
import { apiResponseProxy } from '../API/apiResponseProxy';
import axios from 'axios';

const default_user: UserAPIResponse = {
    success: false,
    data: undefined
};

export const GlobDataContext = React.createContext(
    {
        sports: [] as SportAPIResponse[],
        fields: [] as FieldAPIResponse[],
        user: default_user,
        fetchSports: () => {},
        fetchingSports: false,
        fetchFields: () => {},
        fetchingFields: false,
        fetchUser: (account: string) => (new Promise(() => {})),
        fetchingUser: false
    }
);

const GlobDataProvider = ({ children }:{
    children: ReactElement
}) => {
    const [sports, setSports] = useState<SportAPIResponse[]>([]);
    const [fields, setFields] = useState<FieldAPIResponse[]>([]);
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

    const fetchFields = () => {
        if (fetchingFields === true) return;

        setFetchingFields(true);

        axios({
            method: 'GET',
            url: 'https://admin.chillmonkey.tw/v1/spaces'
        }).then((res) => {
            console.log(res.data);
            setFields(res.data);
        }).catch(() => {
            setFields(apiResponseProxy.fields());
        }).finally(() => setFetchingFields(false));
    };

    const fetchUser = (account: string) => (new Promise<void>((resolve, rej) => {
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
                resolve();
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