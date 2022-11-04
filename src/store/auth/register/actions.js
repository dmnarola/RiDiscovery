import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  EMAIL_VERIFY,
  EMAIL_VERIFY_SUCCESSFUL,
  EMAIL_VERIFY_FAILED,
  REGISTER_COMPANY,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_FAIL
} from "./actionTypes"

export const registerUser = payload => {
  return {
    type: REGISTER_USER,
    payload
  }
}

export const registerUserSuccessful = payload => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload
  }
}

export const registerUserFailed = payload => {
  return {
    type: REGISTER_USER_FAILED,
    payload
  }
}

export const emailVerify = (payload) => {
  return {
    type: EMAIL_VERIFY,
    payload,
  }
}

export const emailVerifySuccessful = (data) => {
  return {
    type: EMAIL_VERIFY_SUCCESSFUL,
    payload: data
  }
}

export const emailVerifyFailed = (data) => {
  return {
    type: EMAIL_VERIFY_FAILED,
    payload: data
  }
}

export const registerCompany = payload => {
  return {
    type: REGISTER_COMPANY,
    payload
  }
}

export const registerCompanySuccess = payload => {
  return {
    type: REGISTER_COMPANY_SUCCESS,
    payload
  }
}

export const registerCompanyFail = payload => {
  return {
    type: REGISTER_COMPANY_FAIL,
    payload
  }
}

