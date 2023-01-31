import { createAction } from 'redux-actions';

// //===================2023-01-27 김상현 ====================

// //예산 실적현황 조회
export const SELECT_BUDGET_STATUS_REQUEST = 'src/erp/account/Saga/Saga/SELECT_BUDGET_STATUS';
export const SELECT_BUDGET_STATUS_SUCCESS = 'src/erp/account/Saga/Saga/SELECT_BUDGET_STATUS_SUCCESS';
export const SELECT_BUDGET_STATUS_FAILURE = 'src/erp/account/Saga/Saga/SELECT_BUDGET_STATUS_FAILURE';

// //=============================================================

export const selectBudgetStatusRequest = createAction(SELECT_BUDGET_STATUS_REQUEST); //예산실적현황 조회
export const selectBudgetStatusSuccess = createAction(SELECT_BUDGET_STATUS_SUCCESS);
export const selectBudgetStatusFailure = createAction(SELECT_BUDGET_STATUS_FAILURE);

const initialState = {
    error: '',
    yearList: [],
    budgetList: []
};

const BudgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_BUDGET_STATUS_REQUEST:
            console.log('예산실적현황');
            return {
                ...state,
                budgetList: []
            };
        case SELECT_BUDGET_STATUS_SUCCESS:
            console.log('예산실적현황 조회성공');
            return {
                ...state,
                budgetList: action.payload
            };
        case SELECT_BUDGET_STATUS_FAILURE:
            console.log('예산실적현황 조회실패');
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default BudgetReducer;
