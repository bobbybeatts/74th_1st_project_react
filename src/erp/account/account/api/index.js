import accountApi from 'api/accountApi';
import { SEARCH_ASSET_DTA_REQUEST } from '../reducer/AccountReducer';

// ================================전표================================
//전표 조회
export const selectSlip = (action) =>
    accountApi.get('/posting/rangedsliplist', {
        params: {
            startDate: action.params.startDate,
            endDate: action.params.endDate,
            slipStatus: action.params.slipStatus
        }
    });
//전표 삭제
export const deleteSlip = (action) =>
    accountApi.delete('/posting/deleteSlip', {
        params: { slipNo: action.params.slipNo }
    });
//전표 수정
export const updateSlip = (action) =>
    accountApi.put('/posting/updateSlip', {
        // params: {
        //     // slipType: action.payload.slipType,
        //     expenseReport: action.params.expenseReport,
        //     slipNo: action.params.slipNo
        // }
        updateSlipData: action.params.updateSlipData
    });
//전표 등록
export const registerslip = (action) =>
    accountApi.post(
        '/posting/registerslip',
        {
            insertSlipData: action.params.insertSlipData
        }
        // { slipData: action.payload.slipData },
        // { journalData: action.payload.journalData },
        // { slipStatus: action.params.slipStatus },
        // { headers: { 'Content-Type': 'application/json' } }
    );
// ================================분개================================
//분개 조회
export const searchJournal = (action) =>
    accountApi.get('/posting/singlejournallist', {
        params: { slipNo: action.params.slipNo }
    });
//분개 삭제
export const deleteJournal = (action) =>
    accountApi.delete('/posting/journalremoval', {
        params: {
            journalNo: action.params.journalNo
        }
    });
//분개 저장
export const saveJournal = (action) =>
    accountApi.post('/posting/modifyJournal', {
        jourData: action.params.jourData
    });
//분개 수정
export const updateJournal = (action) =>
    accountApi.put(
        '/posting/updateJournalList',
        { jourData: action.params.jourData }
        // ,{ headers: { 'Content-Type': 'application/json' } }
    );
// ================================분개 상세================================
//분개 상세 조회
export const searchJournalDetail = (action) =>
    accountApi.get('/posting/journaldetaillist', {
        params: { journalNo: action.params.journalNo }
    });
//분개 상세 저장
export const saveJournalDetail = (action) =>
    accountApi.post(
        '/account/SaveJournalDetailList',
        { SaveJournalDetailList: action.payload.SaveJournalDetailList },
        { headers: { 'Content-Type': 'application/json' } }
    );
// ================================전표 승인================================
//전표 승인 요청
export const approvalSlipRequest = (action) =>
    accountApi.patch('/posting/approvalSlipRequest', {
        patchData: action.patchData
    });
//전표 승인요청 조회
export const amSlipRequest = (action) =>
    accountApi.get('/posting/approvalsliplist', {
        params: {
            startDate: action.params.startDate,
            endDate: action.params.endDate,
            slipStatus: action.params.slipStatus
        }
    });
//승인요청 분개 조회
export const amJournalRequest = (action) =>
    accountApi.get('/posting/approvalJournalList', {
        params: {
            slipNo: action.params.slipNo
        }
    });
//전표 승인
export const updateAmSlip = (action) =>
    accountApi.patch('/posting/approvalslip', {
        approvalData: action.params.approvalData
    });

export const hrAddSlip = (action) =>
    accountApi.post('/account/hrAddSlip', { slipData: action.payload.slipData }, { headers: { 'Content-Type': 'application/json' } });

export const getJournalNo = (action) =>
    accountApi.get('/account/getJournalDetailList', {
        params: {
            journalNo: action.params.journalNo
        }
    });

export const selectGeneralAccountLedger = (action) =>
    accountApi.get('/posting/generalLedgers', {
        params: {
            startDate: action.params.startDate,
            endDate: action.params.endDate
        }
    });

export const searchJournalDouble = (action) =>
    accountApi.get('/posting/rangedjournallist', {
        params: {
            startDate: action.params.startDate,
            endDate: action.params.endDate
        }
    });

export const selectNonCurrent = (action) =>
    accountApi.get('/posting/findCurrentAssetList', {
        params: {
            accountCode: action.params.accountCode,
            accountName: action.params.accountName
        }
    });

export const saveNonCurrent = (action) =>
    accountApi.post('/CurrentAsset/insertCurrentAsset', {
        params: action.params
    });

export const deleteNonCurrent = (action) =>
    accountApi.get('/CurrentAsset/deleteCurrentAsset', {
        params: { assetCode: action.param.assetCode }
    });

//자산 관리 리스트
export const searchCurrent = (action) => accountApi.get('/posting/assetlist', {});

//세부자산관리 리스트
export const searchAssetList = (action) =>
    accountApi.get('/posting/assetitemlist', {
        params: {
            parentsCode: action.params.parentsCode
        }
    });

export const searchAssetDta = (action) =>
    accountApi.get('/posting/assetDta', {
        params: {
            parentsCode: action.params.parentsCode
        }
    });

export const searchDept = (action) => accountApi.get('/operate/deptlist', {});
