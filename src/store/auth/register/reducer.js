import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  EMAIL_VERIFY,
  EMAIL_VERIFY_SUCCESSFUL,
  EMAIL_VERIFY_FAILED,
} from "./actionTypes"

const initialState = {
  registrationError: null,
  message: null,
  isLoading: false,
  user: null,
  emailVerification: false
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        isLoading: true,
        registrationError: null,
      }
      break
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        isLoading: false,
        user: action.payload,
        registrationError: null,
      }
      break
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        user: null,
        isLoading: false,
        registrationError: action.payload,
      }
      break

    case EMAIL_VERIFY:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case EMAIL_VERIFY_SUCCESSFUL:
      state = {
        ...state,
        isLoading: false,
        emailVerification: action?.payloadstatus,
        user: action.payload,
      }
      break
    case EMAIL_VERIFY_FAILED:
      state = {
        ...state,
        isLoading: false,
        emailVerification: action?.payload,
        user: null,
      }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default account
