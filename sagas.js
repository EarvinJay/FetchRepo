import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { REQUEST_API_DATA, receiveApiData } from "./actions";
import { fetchData } from "./api";
import { inputValue } from "./Home"

function* getApiData(action) {
  try {
    const data = yield call(fetchData, inputValue());
    yield put(receiveApiData(data));
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}
