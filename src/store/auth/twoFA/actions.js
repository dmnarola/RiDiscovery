import {
  GENERATE_QR_CODE,
  GENERATE_QR_CODE_SUCCESS,
  GENERATE_QR_CODE_FAIL,

  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL

} from "./actionTypes"

export const generateQRCode = (payload) => {
  return {
    type: GENERATE_QR_CODE,
    payload,
  }
}

export const generateQRCodeSuccess = (data) => {
  return {
    type: GENERATE_QR_CODE_SUCCESS,
    payload: data
  }
}

export const generateQRCodeFail = (data) => {
  return {
    type: GENERATE_QR_CODE_FAIL,
    payload: data
  }
}


export const verifyOtp = (payload, history) => {
  return {
    type: VERIFY_OTP,
    payload: { payload, history },
  }
}

export const verifyOtpSuccess = (data) => {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload: data
  }
}

export const verifyOtpFail = (data) => {
  return {
    type: VERIFY_OTP_FAIL,
    payload: data
  }
}