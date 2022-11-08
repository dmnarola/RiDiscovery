import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { addCompany, editCompany, listAllCompany } from "helpers/fakebackend_helper"
import { ADD_AGENCY, GET_ALL_AGENCY, GET_ALL_DEV_AGENCY, GET_ALL_SECURITY_AGENCY, UPDATE_AGENCY } from "./actionTypes"
import { addAgencySuccess, addAgencyFail, getAllAgencySuccess, getAllAgencyFail, getAllDevAgencySuccess, getAllDevAgencyFail, getAllSecurityAgencySuccess, getAllSecurityAgencyFail, updateAgencySuccess, updateAgencyFail } from "./actions"


/* Add Agency */
function* addNewAgency({ payload }) {
  try {
    const response = yield call(addCompany, payload)
    yield put(addAgencySuccess(response))
  } catch (error) {
    yield put(addAgencyFail(error))
  }
}

/* Update Agency */
function* editAgency({ payload }) {
  try {
    const response = yield call(editCompany, payload)
    yield put(updateAgencySuccess(response))
  } catch (error) {
    yield put(updateAgencyFail(error))
  }
}

/* Get All Agency */
function* getAllAgency({ payload }) {
  try {
    const response = yield call(listAllCompany, payload)
    yield put(getAllAgencySuccess(response))
  } catch (error) {
    yield put(getAllAgencyFail(error))
  }
}

/* Get All Agency */
function* getAllDevAgency({ payload }) {
  try {
    const response = yield call(listAllCompany, payload)
    yield put(getAllDevAgencySuccess(response))
  } catch (error) {
    yield put(getAllDevAgencyFail(error))
  }
}


/* Get All Agency */
function* getAllSecurityAgency({ payload }) {
  try {
    const response = yield call(listAllCompany, payload)
    yield put(getAllSecurityAgencySuccess(response))
  } catch (error) {
    yield put(getAllSecurityAgencyFail(error))
  }
}

export function* watchAgency() {
  yield takeEvery(ADD_AGENCY, addNewAgency)
  yield takeEvery(UPDATE_AGENCY, editAgency)
  yield takeEvery(GET_ALL_AGENCY, getAllAgency)
  yield takeEvery(GET_ALL_DEV_AGENCY, getAllDevAgency)
  yield takeEvery(GET_ALL_SECURITY_AGENCY, getAllSecurityAgency)
}

function* agencySaga() {
  yield all([fork(watchAgency)])
}

export default agencySaga;
