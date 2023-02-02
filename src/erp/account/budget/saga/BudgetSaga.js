import { takeEvery, put, takeLatest, delay, fork } from 'redux-saga/effects';
import * as types from '../reducer/BudgetReducer';
import Axios from 'axios';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';

//======================2023-01-27 김상현 시작======================
const selectBudgetStatusSaga = createRequestSaga(types.SELECT_BUDGET_STATUS_REQUEST, api.selectBudgetStatus);
export default function* BudgetSaga() {
    yield takeEvery(types.SELECT_BUDGET_STATUS_REQUEST, selectBudgetStatusSaga);
}
