import { UserPayload } from '@/api/objects/UserPayload'
import { AUTH, USER } from '../actions/actionTypes'

type TGender = "male" | "female" | "other"


export interface UserState {
  currentUser: UserPayload | null
}

const initialState:UserState = {
  currentUser:null
} 

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case USER.UPDATE_CURRENT_USER:
      return {
        ...state, 
        currentUser: action.payload,
      }
    case AUTH.LOGOUT:
      return {
        ...state,
        currentUser: null
      }
    default:
      return state
  }
}

export default userReducer
