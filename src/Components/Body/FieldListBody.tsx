import SecondaryTitle from '../Title/SecondaryTitle';
import { textMap } from '../../i18n/textMap';
import './fieldListBody.scss';
import FieldCard, { FieldAPIResponse } from '../FieldCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiResponseProxy } from '../../API/apiResponseProxy';

const FieldListBody = () => {
    const [fields, setFields] = useState<FieldAPIResponse[]>([]);

    useEffect(() => {
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        axios({
            method: 'GET',
            url: 'https://admin.chillmonkey.tw/v1/spaces',
            withCredentials: false
        }).then((res) => {
            setFields(res.data);
        }).catch(() => {
            setFields(apiResponseProxy.fields());
        });
    }, []);

    useEffect(() => {
        console.log(fields);
    }, [fields]);

    return (
        <div className="field-list-body">
            <div className="wrapper">
                <SecondaryTitle title={textMap.near_field_title} />

                {
                    fields.map((field) => (
                        <FieldCard
                            {...field}
                            key={field.id}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default FieldListBody;