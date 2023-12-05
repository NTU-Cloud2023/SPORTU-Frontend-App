import React, { useState, ReactElement } from 'react';

export const GlobDataContext = React.createContext({});

const GlobDataProvider = ({ children }:{
    children: ReactElement
}) => {
    const [page, setPage] = useState<PageName>('login');

    return (
        <GlobDataContext.Provider
            value={{
                page,
                setPage
            }}
        >
            {children}
        </GlobDataContext.Provider>
    );
};

export default GlobDataProvider;