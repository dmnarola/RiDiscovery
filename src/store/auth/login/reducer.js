import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  LOGIN_FAIL,
  LOGOUT_USER_FAIL,
  VERIFY_TANENT,
  VERIFY_TANENT_SUCCESS,
  VERIFY_TANENT_FAIL,
  GET_PERMISSION,
  GET_PERMISSION_SUCCESS,
  GET_PERMISSION_FAIL
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  user: null,
  permissions: null,
  tanent: { isTenantAvailable: true }
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action?.payload
      };
      break;
    case LOGIN_FAIL:
      state = {
        ...state,
        loading: false,
        user: null
      };
      break;
    case LOGOUT_USER:
      state = { ...state };

      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state, user: null };
      break;
    case LOGOUT_USER_FAIL:
      state = { ...state, user: null };
      break;
    case VERIFY_TANENT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case VERIFY_TANENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        tanent: action?.payload
      };
      break;
    case VERIFY_TANENT_FAIL:
      state = {
        ...state,
        loading: false,
        tanent: action?.payload
      };
      break;


    case GET_PERMISSION:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_PERMISSION_SUCCESS:
      state = {
        ...state,
        loading: false,
        permissions: action?.payload
      };
      break;
    case GET_PERMISSION_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
