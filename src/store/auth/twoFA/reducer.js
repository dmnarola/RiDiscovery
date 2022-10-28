import {
  GENERATE_QR_CODE,
  GENERATE_QR_CODE_SUCCESS,
  GENERATE_QR_CODE_FAIL,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL
} from "./actionTypes"

const initialState = {
  isLoading: false,
  qrCode: null
}

const twoFA = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_QR_CODE:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case GENERATE_QR_CODE_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        qrCode: action?.payload
      }
      break
    case GENERATE_QR_CODE_FAIL:
      state = {
        ...state,
        isLoading: false,
        qrCode: null
      }
      break


    case VERIFY_OTP:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case VERIFY_OTP_SUCCESS:
      state = {
        ...state,
        isLoading: false,
      }
      break
    case VERIFY_OTP_FAIL:
      state = {
        ...state,
        isLoading: false,
      }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default twoFA
