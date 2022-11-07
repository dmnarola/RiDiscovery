import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN, VERIFY_TANENT } from "./actionTypes";
import { apiError, loginSuccess, loginFail, logoutUserSuccess, verifyTanentSuccess, verifyTanentFail } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
  signIn,
  verifyTanent,
} from "../../../helpers/fakebackend_helper";


const globalTanent = 'http://192.168.100.37:3000'  // app.ridiscovery
const nislTanent = 'http://192.168.100.37:3001' // nisl.ridiscovery

const fireBaseBackend = getFirebaseBackend();

function* checkTenantExistOrNot({ payload }) {
  try {
    const response = yield call(verifyTanent, payload);

    if (response?.status && response?.isTenantAvailable) {
      // if (location.port) {
      //   window.open(`http://localhost:3001/tenant/login`, '_self');
      // } else {
      //   window.open(`http://${response.tenantName}.ridiscovery.com/tenant/login`, '_self');
      // }
      window.open(`${nislTanent}/tenant/login`, '_self');
    }

    yield put(verifyTanentSuccess(response))

    if (response?.isEmailExist) {
      yield put(verifyTanentSuccess(response))
    } else {
      yield put(verifyTanentFail({ isTenantAvailable: true }))
    }
  } catch (error) {
    yield put(verifyTanentFail(error))
  }

}

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(signIn, user);

    if (response?.status && response?.user?.['2FAEnabled']) {
      history.push('/verify-otp')
    } else {
      // if (response?.status) {
      //   localStorage.setItem('authUser', response?.user?.token);
      //   history.push("/dashboard")
      // }

      if (response?.status) {

        if (response?.user?.tenantName) {
          // redirect user to his tenant  // nisl.ridiscovery.com/login
          localStorage.setItem('authUser', response?.user?.token);
          // window.open(`${nislTanent}/dashboard`, '_self');
          history.push("/dashboard")
        }

        else {
          // redirect user to  company registration page  // app.ridiscovery.com/register-company
          localStorage.setItem('authUser', response?.user?.token);
          // window.open(`${globalTanent}/register-company`, '_self');
          history.push("/register-company")
        }
      }

    }
    yield put(loginSuccess(response))
  } catch (error) {
    yield put(loginFail(error))
  }

}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    // history.push("/login")
    history.push("/tenant/login") // both route will be execute on condition
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, data, type);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(VERIFY_TANENT, checkTenantExistOrNot);
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
