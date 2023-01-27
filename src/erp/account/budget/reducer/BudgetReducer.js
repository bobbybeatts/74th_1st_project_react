import { createAction } from 'redux-actions';

//===================2023-01-27 김상현 ====================
//날짜 조회
export const SEARCH_YEAR_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_YEAR';
export const SEARCH_YEAR_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_YEAR_SUCCESS';
export const SEARCH_YEAR_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_YEAR_FAILURE';

const initialState = {
    error: '',
    yearList: []
};

const BaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_YEAR_SUCCESS:
            return {
                ...state,
                yearList: action.payload.accountCodeList
            };
    }
};
