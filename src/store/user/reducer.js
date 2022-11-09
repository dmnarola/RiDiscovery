import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,

  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,

  ACTIVE_DEACTIVE_USER,
  ACTIVE_DEACTIVE_USER_SUCCESS,
  ACTIVE_DEACTIVE_USER_FAIL,

  GET_ALL_USER,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,

} from "./actionTypes"

const initialState = {
  isLoading: false,
  isError: false,
  users: [],
}

const agency = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case ADD_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
      }
      break
    case ADD_USER_FAIL:
      state = {
        ...state,
        isLoading: false,
        isError: true
      }
      break

    case UPDATE_USER:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case UPDATE_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
      }
      break
    case UPDATE_USER_FAIL:
      state = {
        ...state,
        isLoading: false,
        isError: true
      }
      break

    case ACTIVE_DEACTIVE_USER:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case ACTIVE_DEACTIVE_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
      }
      break
    case ACTIVE_DEACTIVE_USER_FAIL:
      state = {
        ...state,
        isLoading: false,
        isError: true
      }
      break

    case GET_ALL_USER:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case GET_ALL_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        users: action?.payload
      }
      break
    case GET_ALL_USER_FAIL:
      state = {
        ...state,
        isLoading: false,
        users: [],
        isError: true
      }
      break


    default:
      state = { ...state }
      break
  }
  return state
}

export default agency;
