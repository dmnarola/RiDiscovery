import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { addUser, editUser, listAllUser } from "helpers/fakebackend_helper"
import { ACTIVE_DEACTIVE_USER, ADD_USER, UPDATE_USER, GET_ALL_USER } from "./actionTypes"
import { activeDectiveUserFail, activeDectiveUserSuccess, addUserFail, addUserSuccess, getAllUserFail, getAllUserSuccess, updateUserFail, updateUserSuccess } from "./actions"


/* Add User */
function* addNewUser({ payload }) {
  try {
    const response = yield call(addUser, payload)
    yield put(addUserSuccess(response))
  } catch (error) {
    yield put(addUserFail(error))
  }
}

/* Update User */
function* updateUser({ payload }) {
  try {
    const response = yield call(editUser, payload)
    yield put(updateUserSuccess(response))
  } catch (error) {
    yield put(updateUserFail(error))
  }
}

/* Get All User */
function* getAllUSers({ payload }) {
  try {
    const response = yield call(listAllUser, payload)
    yield put(getAllUserSuccess(response))
  } catch (error) {
    yield put(getAllUserFail(error))
  }
}

/* ACtive - Deactive User */
function* activeDeactiveUser({ payload }) {
  try {
    // const response = yield call(listAllCompany, payload)
    yield put(activeDectiveUserSuccess(response))
  } catch (error) {
    yield put(activeDectiveUserFail(error))
  }
}



export function* watchUsers() {
  yield takeEvery(ADD_USER, addNewUser)
  yield takeEvery(UPDATE_USER, updateUser)
  yield takeEvery(GET_ALL_USER, getAllUSers)
  yield takeEvery(ACTIVE_DEACTIVE_USER, activeDeactiveUser)
}

function* userSaga() {
  yield all([fork(watchUsers)])
}

export default userSaga;
