import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, loginFail, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
  signIn,
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  console.log({ user, history })
  try {
    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(
    //     fireBaseBackend.loginUser,
    //     user.email,
    //     user.password
    //   );
    //   yield put(loginSuccess(response));
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
    //   const response = yield call(postJwtLogin, {
    //     email: user.email,
    //     password: user.password,
    //   });
    //   localStorage.setItem("authUser", JSON.stringify(response));
    //   yield put(loginSuccess(response));
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
    //   const response = yield call(postFakeLogin, {
    //     email: user.email,
    //     password: user.password,
    //   });
    //   localStorage.setItem("authUser", JSON.stringify(response));
    //   yield put(loginSuccess(response));
    // }

    try {
      const response = yield call(signIn, user);
      if (response?.status) {
        localStorage.setItem('authUser', response?.user?.token);
        history.push("/dashboard")
      }
      yield put(loginSuccess(response))
    } catch (error) {
      yield put(loginFail(error))
    }

  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(fireBaseBackend.logout);
    //   yield put(logoutUserSuccess(response));
    // }
    history.push("/login")
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
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
