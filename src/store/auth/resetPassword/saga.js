import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { resetPassword } from "helpers/fakebackend_helper"
import { RESET_PASSWORD } from "./actionTypes"
import { resetPasswordSuccess, resetPasswordFail } from "./actions"


/* Reset Password */
function* resetUserPassword({ payload }) {
  try {
    const response = yield call(resetPassword, payload)
    yield put(resetPasswordSuccess(response))

  } catch (error) {
    yield put(resetPasswordFail(error))
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetUserPassword)
}

function* resetPasswordSaga() {
  yield all([fork(watchResetPassword)])
}

export default resetPasswordSaga
