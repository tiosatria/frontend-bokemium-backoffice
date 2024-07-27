import { type ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";
import api from "../../api/system/api";
import { AUTH, GENERAL, USER } from "@store/actions/actionTypes";
import { API_URL } from "@libs/constant";
import encryptedLS from "@api/system/encryptedLS";
import jwt from "jsonwebtoken";
import type { RootState } from "@store/reducers";
import { UserPayload } from "@/api/objects/UserPayload";
import { AdminLogin } from "@/api/objects/AdminLogin";

export const login =
  (data: AdminLogin) =>
  async (dispatch: ThunkDispatch<RootState, object, AnyAction>) => {
    const response = await api.post(`${API_URL}/api/user/auth/admin`, data);
    const token : string = response.data.data;
    const userPayload = decodeJwtFE(token);
    console.log(token)
    const creds = token;
    encryptedLS.set("creds", creds);
    dispatch({
      type: USER.UPDATE_CURRENT_USER,
      payload: userPayload,
    });
  };

export const register =
  (data: string) => (dispatch: ThunkDispatch<RootState, object, AnyAction>) => {
    const userPayload = decodeJwtFE(data);
    encryptedLS.set("creds", data);
    dispatch({
      type: USER.UPDATE_CURRENT_USER,
      payload: userPayload,
    });
  };

export const decodeJwtFE = (token: string): UserPayload | null => {
  try {
    const decoded: any = jwt.decode(token);
    console.log(token)
    console.log(decoded)
    // Parse properties with specific data types
    return {
      userId: Number(decoded.UserId),
      email: decoded.Email,
      registeredIp: decoded.RegisteredIp,
      username: decoded.Username,
      phone: decoded.Phone,
      registered: null,
      profilePic: decoded.ProfilePic
    };
  } catch (error) {
    return null;
  }
};

export const logout =
  () => async (dispatch: ThunkDispatch<object, object, AnyAction>) => {
    localStorage.removeItem("creds");
    dispatch({
      type: AUTH.LOGOUT,
      payload: null,
    });
    dispatch({
      type: "RESET_STORE",
    });
  };
