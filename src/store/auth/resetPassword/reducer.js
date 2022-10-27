import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "./actionTypes"

const initialState = {
  isLoading: false
}

const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        isLoading: false,
      }
      break
    case RESET_PASSWORD_FAIL:
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

export default resetPassword
