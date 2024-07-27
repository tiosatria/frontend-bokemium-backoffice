import { AnyAction } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../reducers";
import { GENERAL } from "./actionTypes";

export const toggleNavlink = () => (dispatch:ThunkDispatch<RootState,object,AnyAction>) => dispatch({
  type: GENERAL.TOGGLE_NAVLINK
})

export const setActivePath = (path:string) => (dispatch:ThunkDispatch<RootState,object,AnyAction>) => dispatch({
  type: GENERAL.SET_ACTIVE_PATH,
  payload: path
})