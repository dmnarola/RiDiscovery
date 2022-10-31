import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import ResetPassword from "./auth/resetPassword/reducer"
import TwoFA from "./auth/twoFA/reducer"
import Profile from "./auth/profile/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//invoices
import invoices from "./invoices/reducer"

//contacts
import contacts from "./contacts/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  ResetPassword,
  TwoFA,
  Profile,
  calendar,
  chat,
  invoices,
  contacts,
})

export default rootReducer
