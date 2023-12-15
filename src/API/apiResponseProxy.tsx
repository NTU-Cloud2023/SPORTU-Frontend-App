import { FieldAPIResponse, SportAPIResponse, UserAPIResponse } from './APIInterface';

const userData: UserAPIResponse = {
    'success': true,
    'data': {
        'id': 4,
        'email': 'tsuyiren@gmail.com',
        'nick_name': 'joey',
        'updated_at': '2023-12-07T00:00:00.000000Z',
        'created_at': '2023-12-07T00:00:00.000000Z'
    }
};

const fieldsData: FieldAPIResponse[] = // 20231215172544
// https://admin.chillmonkey.tw/v1/spaces
[
    {
        'id': 7,
        'name': '臺灣大學中央籃球場',
        'latitude': '25.020164958503596',
        'longitude': '121.53642029764626',
        'capacity': 100,
        'type': 1,
        'address': '羅斯福路四段中正區台北市100號',
        'eachtime': 1,
        'in_game': 2,
        'pic': 'https://admin.chillmonkey.tw/assets/img/court/default2.png',
        'updated_at': '2023-12-15T00:00:00.000000Z',
        'created_at': '2023-12-03T00:00:00.000000Z',
        'ball_type': {
            'type': 1,
            'game_name': 'Basketball',
            'cht_game_name': '籃球'
        },
        'headcount': 0,
        'nav_url': 'https://www.google.com/maps/dir/?api=1&destination=25.020164958503596,121.53642029764626'
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
        'in_game': 2,
        'pic': 'https://admin.chillmonkey.tw/assets/img/court/default.png',
        'updated_at': '2023-12-03T00:00:00.000000Z',
        'created_at': '2023-12-03T00:00:00.000000Z',
        'ball_type': {
            'type': 1,
            'game_name': 'Basketball',
            'cht_game_name': '籃球'
        },
        'headcount': 200,
        'nav_url': 'https://www.google.com/maps/dir/?api=1&destination=25.021497426449013,121.53512656712563'
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
        'in_game': 2,
        'pic': 'https://admin.chillmonkey.tw/assets/img/court/default.png',
        'updated_at': '2023-12-03T00:00:00.000000Z',
        'created_at': '2023-12-03T00:00:00.000000Z',
        'ball_type': {
            'type': 1,
            'game_name': 'Basketball',
            'cht_game_name': '籃球'
        },
        'headcount': 0,
        'nav_url': 'https://www.google.com/maps/dir/?api=1&destination=25.020417731056515,121.53758436213431'
    },
    {
        'id': 42,
        'name': '大安國中籃球場',
        'latitude': '25.03030532702774',
        'longitude': '121.54639883193872',
        'capacity': 50,
        'type': 1,
        'address': '台北市大安區四維路156號',
        'eachtime': 2,
        'in_game': 2,
        'pic': 'https://admin.chillmonkey.tw/assets/img/court/default.png',
        'updated_at': '2023-12-13T00:00:00.000000Z',
        'created_at': '2023-12-13T00:00:00.000000Z',
        'ball_type': {
            'type': 1,
            'game_name': 'Basketball',
            'cht_game_name': '籃球'
        },
        'headcount': 0,
        'nav_url': 'https://www.google.com/maps/dir/?api=1&destination=25.03030532702774,121.54639883193872'
    },
    {
        'id': 43,
        'name': '台大排球場',
        'latitude': '25.019277085624132',
        'longitude': '121.53651503776825',
        'capacity': 48,
        'type': 2,
        'address': '台北市大安區羅斯福路四段一號',
        'eachtime': 12,
        'in_game': 2,
        'pic': 'https://admin.chillmonkey.tw/assets/img/court/default.png',
        'updated_at': '2023-12-13T00:00:00.000000Z',
        'created_at': '2023-12-13T00:00:00.000000Z',
        'ball_type': {
            'type': 2,
            'game_name': 'Volleyball',
            'cht_game_name': '排球'
        },
        'headcount': 0,
        'nav_url': 'https://www.google.com/maps/dir/?api=1&destination=25.019277085624132,121.53651503776825'
    },
    {
        'id': 44,
        'name': '台北和平籃球館',
        'latitude': '25.0216038106997',
        'longitude': '121.5455184445402',
        'capacity': 100,
        'type': 1,
        'address': '台北市大安區敦南街76巷28號',
        'eachtime': 2,
        'in_game': 2,
        'pic': 'https://admin.chillmonkey.tw/assets/img/court/default.png',
        'updated_at': '2023-12-14T00:00:00.000000Z',
        'created_at': '2023-12-14T00:00:00.000000Z',
        'ball_type': {
            'type': 1,
            'game_name': 'Basketball',
            'cht_game_name': '籃球'
        },
        'headcount': 0,
        'nav_url': 'https://www.google.com/maps/dir/?api=1&destination=25.0216038106997,121.5455184445402'
    },
    {
        'id': 45,
        'name': '北醫排球場',
        'latitude': '25.02463701142581',
        'longitude': '121.56154726186037',
        'capacity': 50,
        'type': 2,
        'address': '台北市信義區110',
        'eachtime': 3,
        'in_game': 12,
        'pic': 'https://admin.chillmonkey.tw/assets/img/court/default.png',
        'updated_at': '2023-12-14T00:00:00.000000Z',
        'created_at': '2023-12-14T00:00:00.000000Z',
        'ball_type': {
            'type': 2,
            'game_name': 'Volleyball',
            'cht_game_name': '排球'
        },
        'headcount': 0,
        'nav_url': 'https://www.google.com/maps/dir/?api=1&destination=25.02463701142581,121.56154726186037'
    },
    {
        'id': 46,
        'name': '臺中水湳中央公園籃球場',
        'latitude': '24.18357093459092',
        'longitude': '120.65229442434484',
        'capacity': 50,
        'type': 1,
        'address': '台中市西屯區臺中中央球場',
        'eachtime': 2,
        'in_game': 2,
        'pic': 'https://admin.chillmonkey.tw/assets/img/court/default.png',
        'updated_at': '2023-12-14T00:00:00.000000Z',
        'created_at': '2023-12-14T00:00:00.000000Z',
        'ball_type': {
            'type': 1,
            'game_name': 'Basketball',
            'cht_game_name': '籃球'
        },
        'headcount': 0,
        'nav_url': 'https://www.google.com/maps/dir/?api=1&destination=24.18357093459092,120.65229442434484'
    }
];

const sportsData: SportAPIResponse[] = [
    {
        'type': 1,
        'game_name': 'Basketball',
        'cht_game_name': '籃球'
    },
    {
        'type': 2,
        'game_name': 'Volleyball',
        'cht_game_name': '排球'
    },
    {
        'type': 3,
        'game_name': 'Tennis',
        'cht_game_name': '網球'
    },
    {
        'type': 4,
        'game_name': 'badminton',
        'cht_game_name': '羽球'
    },
    {
        'type': 6,
        'game_name': 'TableTennis',
        'cht_game_name': '桌球'
    },
    {
        'type': 7,
        'game_name': 'Baseball',
        'cht_game_name': '棒球'
    },
    {
        'type': 8,
        'game_name': 'Soccer',
        'cht_game_name': '足球'
    }
];

export const apiResponseProxy = {
    fields: () => fieldsData,
    sports: () => sportsData,
    user: () => userData
};