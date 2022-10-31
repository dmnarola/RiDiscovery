import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "./actionTypes"

export const resetPassword = (payload, history) => {
  return {
    type: RESET_PASSWORD,
    payload: { payload, history },
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