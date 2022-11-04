import {
  ADD_AGENCY,
  ADD_AGENCY_SUCCESS,
  ADD_AGENCY_FAIL,

  GET_ALL_AGENCY,
  GET_ALL_AGENCY_SUCCESS,
  GET_ALL_AGENCY_FAIL,

  GET_ALL_DEV_AGENCY,
  GET_ALL_DEV_AGENCY_SUCCESS,
  GET_ALL_DEV_AGENCY_FAIL,

  GET_ALL_SECURITY_AGENCY,
  GET_ALL_SECURITY_AGENCY_SUCCESS,
  GET_ALL_SECURITY_AGENCY_FAIL,


} from "./actionTypes"

const initialState = {
  isLoading: false,
  isError: false,
  allAgency: [],
  devAgency: {},
  securityAgency: {},
}

const agency = (state = initialState, action) => {
  switch (action.type) {
    case ADD_AGENCY:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case ADD_AGENCY_SUCCESS:
      state = {
        ...state,
        isLoading: false,
      }
      break
    case ADD_AGENCY_FAIL:
      state = {
        ...state,
        isLoading: false,
        isError: true
      }
      break

    case GET_ALL_AGENCY:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case GET_ALL_AGENCY_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        allAgency: action?.payload
      }
      break
    case GET_ALL_AGENCY_FAIL:
      state = {
        ...state,
        isLoading: false,
        allAgency: [],
        isError: true
      }
      break

    case GET_ALL_DEV_AGENCY:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case GET_ALL_DEV_AGENCY_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        devAgency: action?.payload
      }
      break
    case GET_ALL_DEV_AGENCY_FAIL:
      state = {
        ...state,
        isLoading: false,
        devAgency: {},
        isError: true
      }
      break


    case GET_ALL_SECURITY_AGENCY:
      state = {
        ...state,
        isLoading: true,
      }
      break
    case GET_ALL_SECURITY_AGENCY_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        securityAgency: action?.payload
      }
      break
    case GET_ALL_SECURITY_AGENCY_FAIL:
      state = {
        ...state,
        isLoading: false,
        securityAgency: {},
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
