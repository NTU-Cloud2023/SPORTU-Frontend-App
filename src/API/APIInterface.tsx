export interface BallType {
    type: number,
    game_name: string,
    cht_game_name: string
}

export type SportAPIResponse = BallType

export interface FieldAPIResponse {
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    capacity: number,
    type: number,
    address: string,
    eachtime: number,
    ball_type: BallType,
    headcount: number,
    updated_at: string,
    created_at: string,
    nav_url: string,
    pic: string,
    in_game: number
}

export interface UserData {
    id: number,
    email: string,
    nick_name: string,
    updated_at: string,
    created_at: string
}

export interface UserAPIResponse {
    success: boolean,
    data: UserData | undefined
}

export interface Appointment {
    /**
     * Pending 是排隊處理中
     * Waiting 是正在媒合 (等等把球場in_game都改1，就會跳過這個狀態)
     * Failed 是預約失敗
     * Successed 是成功
     */
    UserId: string,
    Timestamp: string,
    CourtID: string,
    NickName: string,
    Status: 'Pending' | 'Waiting' | 'Failed' | 'Successed',
    TimestampUserId: string
}

export interface AppointmentAPIResponse {
    success: boolean,
    data: Appointment[]
}

export interface DistanceAPIResponse {
    distance: number,
    duration: number
}

export interface OrderData {
    nickName: string,
    spaceId: string,
    timestamp: number,
    userId: number
}

export interface OrderAPIResponse {
    message: string,
    data: OrderData
}

export interface GoogleMapKeyAPIResponse {
    api_key: string
}