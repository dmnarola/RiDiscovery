import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
} from "./actionTypes"

export const userForgetPassword = (payload) => {
  return {
    type: FORGET_PASSWORD,
    payload
  }
}

export const userForgetPasswordSuccess = data => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: data,
  }
}

export const userForgetPasswordError = data => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: data,
  }
}
