import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { EMAIL_VERIFY, REGISTER_COMPANY, REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed, emailVerifySuccessful, emailVerifyFailed, registerCompanySuccess, registerCompanyFail } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  onBoardCompany,
  postFakeRegister,
  postJwtRegister,
  registerNewUser,
  verifyUserEmail,
} from "../../../helpers/fakebackend_helper"
import { Toast } from "components/Common/Toaster"
import { RESET_PASSWORD } from "helpers/url_helper"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload }) {
  try {
    const response = yield call(registerNewUser, payload)
    yield put(registerUserSuccessful(response))
  } catch (error) {
    yield put(registerUserFailed(error))
  }
}

/* Email Verification */
function* verifyEmail({ payload }) {
  try {
    const response = yield call(verifyUserEmail, payload)
    yield put(emailVerifySuccessful(response))

  } catch (error) {
    yield put(emailVerifyFailed(error))
  }
}

/** Register OR Onboarding new company */
function* companyOnBoarding({ payload }) {
  try {
    const response = yield call(onBoardCompany, payload)
    yield put(registerCompanySuccess(response))
  } catch (error) {
    yield put(registerCompanyFail(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
  yield takeEvery(EMAIL_VERIFY, verifyEmail)
  yield takeEvery(REGISTER_COMPANY, companyOnBoarding)
}

function* accountSaga() {
  yield all([fork(
    watchUserRegister,
    verifyEmail
  )])
}

export default accountSaga
