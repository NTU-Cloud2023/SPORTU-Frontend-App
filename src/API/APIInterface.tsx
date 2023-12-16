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
