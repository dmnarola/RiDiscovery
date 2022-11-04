import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { getQRCode, verifyOTP } from "helpers/fakebackend_helper"
import { GENERATE_QR_CODE, VERIFY_OTP } from "./actionTypes"
import { generateQRCodeSuccess, generateQRCodeFail, verifyOtpSuccess, verifyOtpFail } from "./actions"


function* generateQRCode({ payload }) {
  try {
    const response = yield call(getQRCode, payload)
    yield put(generateQRCodeSuccess(response))

  } catch (error) {
    yield put(generateQRCodeFail(error))
  }
}

function* verify2FAOtp({ payload: { payload, history } }) {
  try {
    const response = yield call(verifyOTP, payload)
    // if (response?.status) {
    //   localStorage.setItem('authUser', response?.user?.token);
    //   history.push('/dashboard')
    // }

    if (response?.status) {
      if (response?.user?.tenantName) {
        localStorage.setItem('authUser', response?.user?.token);
        history.push("/dashboard")
      }
      else {
        localStorage.setItem('authUser', response?.user?.token);
        history.push("/register-company")
      }
    }

    yield put(verifyOtpSuccess(response))
  } catch (error) {
    yield put(verifyOtpFail(error))
  }
}

export function* watchQRCode() {
  yield takeEvery(GENERATE_QR_CODE, generateQRCode)
  yield takeEvery(VERIFY_OTP, verify2FAOtp)
}

function* generate2FASaga() {
  yield all([fork(watchQRCode)])
}

export default generate2FASaga
