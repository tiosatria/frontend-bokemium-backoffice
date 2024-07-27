import { GENERAL } from '../actions/actionTypes'


export interface GeneralState {
  theme: 'dark' | 'light',
  navlinkOpen:boolean
  activePath:string
}


const initialState:GeneralState = {
  theme: 'dark',
  navlinkOpen: true,
  activePath: "/"
} 


const generalReducer = (state = initialState, action: any): GeneralState => {
  switch (action.type) {
      case GENERAL.SET_THEME:
        return {
          ...state,
          theme: action.payload
        }
      case GENERAL.TOGGLE_NAVLINK: {
        return {
          ...state,
          navlinkOpen: !state.navlinkOpen
        }
      }
      case GENERAL.SET_ACTIVE_PATH: {
        return{
          ...state,
          activePath: action.payload
        }
      }
    default:
      return state
  }
}

export default generalReducer


