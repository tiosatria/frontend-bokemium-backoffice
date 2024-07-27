export interface UserPayload {
    userId:number
    username:string
    email:string
    registered:Date|null
    phone?:string
    registeredIp:string
    profilePic?:string
}