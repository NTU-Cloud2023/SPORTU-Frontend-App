import React, { useState, ReactElement } from 'react';
import { FieldAPIResponse, UserAPIResponse } from '../API/APIInterface';
import { apiResponseProxy } from '../API/apiResponseProxy';
import axios from 'axios';

const default_user: UserAPIResponse = {
    success: false,
    data: undefined
};

export const GlobDataContext = React.createContext(
    {
        fields: [] as FieldAPIResponse[],
        user: default_user,
        fetchFields: () => {},
        fetchingFields: false,
        fetchUser: (account: string) => (new Promise(() => {})),
        fetchingUser: false
    }
);

const GlobDataProvider = ({ children }:{
    children: ReactElement
}) => {
    const [fields, setFields] = useState<FieldAPIResponse[]>([]);
    const [user, setUser] = useState<UserAPIResponse>(default_user);
    const [fetchingFields, setFetchingFields] = useState(false);
    const fetchFields = () => {
        setFetchingFields(true);

        axios({
            method: 'GET',
            url: 'https://admin.chillmonkey.tw/v1/spaces'
        }).then((res) => {
            setFields(res.data);
        }).catch(() => {
            setFields(apiResponseProxy.fields());
        }).finally(() => setFetchingFields(false));
    };
    const [fetchingUser, setFetchingUser] = useState(false);
    const fetchUser = (account: string) => (new Promise<void>((resolve, rej) => {
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
                fields,
                user,
                fetchingFields,
                fetchFields,
                fetchUser,
                fetchingUser
            }}
        >
            {children}
        </GlobDataContext.Provider>
    );
};

export default GlobDataProvider;