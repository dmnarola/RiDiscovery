import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
} from "./actionTypes"

const initialState = {
  isLoading: false,
  user: null
}

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        isLoading: true
      }
      break
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        user: action?.payload
      }
      break
    case FORGET_PASSWORD_ERROR:
      state = {
        ...state,
        isLoading: false,
        user: null
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default forgetPassword
