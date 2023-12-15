import { FieldAPIResponse } from './APIInterface';

const fieldsData: FieldAPIResponse[] = [
    {
        'id': 7,
        'name': '臺灣大學中央籃球場',
        'latitude': '25.020164958503596',
        'longitude': '121.53642029764626',
        'capacity': 100,
        'type': 1,
        'address': '羅斯福路四段中正區台北市100號',
        'eachtime': 1,
        'updated_at': '2023-12-03T00:00:00.000000Z',
        'created_at': '2023-12-03T00:00:00.000000Z',
        'ball_type': {
            'type': 1,
            'game_name': 'Basketball',
            'cht_game_name': '籃球'
        },
        'headcount': 0
    },
    {
        'id': 8,
        'name': '臺灣大學綜合體育館',
        'latitude': '25.021497426449013',
        'longitude': '121.53512656712563',
        'capacity': 300,
        'type': 1,
        'address': '台北市大安區羅斯福路四段1號',
        'eachtime': 1,
        'updated_at': '2023-12-03T00:00:00.000000Z',
        'created_at': '2023-12-03T00:00:00.000000Z',
        'ball_type': {
            'type': 1,
            'game_name': 'Basketball',
            'cht_game_name': '籃球'
        },
        'headcount': 200
    },
    {
        'id': 9,
        'name': '臺灣大學醉月湖湖心亭單挑',
        'latitude': '25.020417731056515',
        'longitude': '121.53758436213431',
        'capacity': 2,
        'type': 1,
        'address': '台北市大安區羅斯福路四段1號',
        'eachtime': 1,
        'updated_at': '2023-12-03T00:00:00.000000Z',
        'created_at': '2023-12-03T00:00:00.000000Z',
        'ball_type': {
            'type': 1,
            'game_name': 'Basketball',
            'cht_game_name': '籃球'
        },
        'headcount': 0
    }
];

export const apiResponseProxy = {
    fields: () => fieldsData
};