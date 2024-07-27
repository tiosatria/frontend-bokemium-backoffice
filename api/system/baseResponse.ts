
export enum EnumStatusBaseResponse {
    Unknown = 204,
    Invalid = 412,
    Error = 400,
    Success = 200
}

export interface BaseResponse<T>{
    status: EnumStatusBaseResponse
    message:string
    data : T
}