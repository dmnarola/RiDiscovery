import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "./actionTypes"

export const resetPassword = (payload) => {
  return {
    type: RESET_PASSWORD,
    payload,
  }
}

export const resetPasswordSuccess = (data) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: data
  }
}

export const resetPasswordFail = (data) => {
  return {
    type: RESET_PASSWORD_FAIL,
    payload: data
  }
}