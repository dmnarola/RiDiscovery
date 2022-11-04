import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ResetPasswordSaga from "./auth/resetPassword/saga"
import TwoFASaga from "./auth/twoFA/saga"
import AgencySaga from "./company/agency/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import invoiceSaga from "./invoices/saga"
import contactsSaga from "./contacts/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ResetPasswordSaga),
    fork(TwoFASaga),
    fork(AgencySaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(invoiceSaga),
    fork(contactsSaga)
  ])
}
