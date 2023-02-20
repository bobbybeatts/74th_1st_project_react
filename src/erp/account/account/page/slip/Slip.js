import React, { useEffect, useState } from 'react';
// material-ui
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import TaskIcon from '@mui/icons-material/Task';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//Dialog
import DeleteCheckDialog from './DeleteCheckDialog';
import AccountDialog from '../../../base/page/accountform/AccountDialog';
import CustomerDialog from '../../../base/page/workplacemanagement/CustomerDialog';
// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import { gridSpacing } from '../../../../../template/store/constant';
// assets
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../reducer/AccountReducer';
import * as type from '../../../base/reducer/BaseReducer';
import moment from 'moment/moment';

import Swal from 'sweetalert2';
import { useFetcher } from 'react-router-dom';

//Columns
//전표칼럼
const slipColumns = [
    { width: '30', headerCheckboxSelection: true, checkboxSelection: true, key: 'slipCheck', field: ' ' }, //체크박스
    { width: '90', headerName: '기수일련번호', field: 'accountPeriodNo', key: 'accountPeriodNo', align: 'center' },
    { width: '180', headerName: '전표일련번호', field: 'slipNo', key: 'slipNo' },
    { headerName: '작성날짜', field: 'reportingDate', key: 'reportingDate', type: 'date' },
    { headerName: '작성자코드', field: 'reportingEmpCode', key: 'reportingEmpCode' },
    {
        width: '200',
        headerName: '품의내역',
        field: 'expenseReport',
        editable: true,
        key: 'expenseReport'
    }, // editable : 편집가능
    { headerName: '승인자', field: 'reportingEmpName', key: 'reportingEmpName' },
    { headerName: '승인상태', field: 'slipStatus', key: 'slipStatus' }
];
//분개칼럼
const indignationColumns = [
    { width: '30', headerCheckboxSelection: true, checkboxSelection: true, field: ' ' }, //체크박스
    { width: '250', headerName: '분개일련번호', field: 'journalNo' },
    { headerName: '계정코드', field: 'accountCode' },
    { headerName: '계정명', field: 'accountName' },
    { headerName: '거래처코드', field: 'customerCode' },
    { headerName: '거래처명', field: 'customerName', hide: true },
    {
        headerName: '대차구분',
        field: 'balanceDivision',
        editable: true,
        type: 'singleSelect',
        valueOptions: ['대변', '차변']
    },
    {
        headerName: '차변',
        field: 'leftDebtorPrice',
        editable: true
        //valueFormatter:' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
    },
    {
        headerName: '대변',
        field: 'rightCreditsPrice',
        editable: true
        //valueFormatter:' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
    }
];

//분개상세칼럼
const indignationDetailColumns = [
    { width: '30', headerCheckboxSelection: true, checkboxSelection: true, field: ' ' }, //체크박스
    { headerName: '분개번호', field: 'journalDetailNo', width: 250 },
    { headerName: '계정명', field: 'accountControlName', width: 250 },
    { headerName: '계정내용', field: 'accountControlType', width: 250 },
    {
        headerName: '상세내용',
        field: 'journalDescription',
        editable: true,
        width: 250
    }
];

// ==============================|| 일반전표 ||============================== //

const SlipForm = () => {
    const slipData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.slipFormList);
    const journalData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.journalList);
    const journalDetailData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.journalDetailList);

    let year = moment(new Date()).format('yyyy');
    let month = moment(new Date()).format('MM');
    //let date = moment(new Date()).format("DD");
    let toDay = moment(new Date()).format('yyyy-MM-DD');
    let monthFirstDay = year + '-' + month + '-01';
    const yearFirst = year + '-01-01';
    const yearLast = year + '-12-31';
    const yearData = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.periodNoList);
    const periodNo = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.periodNo);
    useEffect(() => {
        dispatch({
            type: type.SEARCH_T_PERIOD_NO_REQUEST,
            params: {
                yearFirst: yearFirst,
                yearLast: yearLast
            }
        });
    }, []);

    const theme = useTheme();
    const dispatch = useDispatch(); // useDispatch()는 리덕스 내장 함순데 밖에서 사용하기 위해서 dispatch변수 적어준다.
    const [slipStatus, setSlipStatus] = useState('전체');
    const [startDate, setStartDate] = useState(monthFirstDay); //시작 날짜
    const [endDate, setEndDate] = useState(toDay);
    const [delButton, setDelButton] = useState('');

    const [selecSlip, setSelecSlip] = useState('');
    const [slipNo, setSlipNo] = useState('');
    const [status, setStatus] = useState('');
    const [expenseReport, setExpenseReport] = useState('');

    const [jourCount, setJourCount] = useState('1');
    const [jourNo, setJourNo] = useState('');
    const [accountCode, setAccountCode] = useState(''); //계정선택 useState();
    const [accountName, setAccountName] = useState('');
    const [selecJour, setSelecJour] = useState('');
    const [leftDebtorPrice, setLeftDebtorPrice] = useState('');
    const [rightCreditsPrice, setRightCreditsPrice] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const handleClose = () => {
        setOpenDialog(false);
    };
    const deleteCheck = (e) => {
        console.log(e.target.id);
        setOpenDialog(true);
        setDelButton(e.target.id);
    };
    //계정선택 dialog
    const [accountSelectDialog, setAccountSelectDialog] = useState(false);
    //거래처코드 선택 dialog
    const [customerCodeDialog, setCustomerCodeDialog] = useState(false);
    const [customerCode, setCustomerCode] = useState('');
    const [customerName, setCustomerName] = useState('');

    const cellRender = (e) => {
        if (e.field === 'expenseReport') {
            console.log(selecSlip);
            console.log(slipNo);
            console.log(expenseReport);
            dispatch({
                type: types.ADD_EXPENSEREPORT,
                params: {
                    slipData: slipData.filter((data) => data.slipNo !== slipNo),
                    expenseReport: expenseReport,
                    selecSlip: selecSlip
                }
            });
        } else if (e.field === 'leftDebtorPrice') {
            dispatch({
                type: types.ADD_LEFTDEBTORPRICE,
                params: {
                    selecJour: selecJour,
                    leftDebtorPrice: leftDebtorPrice,
                    journalData: journalData.filter((data) => data.journalNo !== jourNo)
                }
            });
        } else if (e.field === 'rightCreditsPrice') {
            dispatch({
                type: types.ADD_RIGHTCREDITSPRICE,
                params: {
                    selecJour: selecJour,
                    rightCreditsPrice: rightCreditsPrice,
                    journalData: journalData.filter((data) => data.journalNo !== jourNo)
                }
            });
        }
    };
    //>>>>>>>>>적을 때 마다 찍힘 // 렌더링이 계속 되는건 아니라서 상관 없긴 할듯?
    const inputValue = (e) => {
        if (e.field === 'expenseReport') {
            console.log(e);
            console.log(e.props.value);
            setExpenseReport(e.props.value);
        } else if (e.field === 'leftDebtorPrice') {
            console.log(e);
            console.log(e.props.value);
            setLeftDebtorPrice(e.props.value);
        } else if (e.field === 'rightCreditsPrice') {
            console.log(e);
            console.log(e.props.value);
            setRightCreditsPrice(e.props.value);
        }
    };
    //==========================전표CRUD=================================
    //조회
    const searchSlip = () => {
        dispatch({
            type: types.SELECT_SLIP_START,
            params: {
                startDate: startDate,
                endDate: endDate,
                slipStatus: slipStatus
            }
        });
        console.log(slipData);
    };
    //전표 추가
    const addSlip = () => {
        console.log('전표 추가');
        console.log(yearData);
        if (status == '작성중') {
            return Swal.fire({
                icon: 'warning',
                title: '작성을 마무리해 주십시오',
                showConfirmButton: '확인'
            });
        } else {
            dispatch({
                type: types.ADD_SLIP,
                params: {
                    accountPeriodNo: periodNo.accountPeriodNo,
                    reportingDate: endDate
                }
            });
            setStatus('작성중');
            setExpenseReport('');
        }
    };
    //전표 삭제
    const deleteData = () => {
        if (delButton == 'slipDelete') {
            dispatch({
                type: types.DELETE_SLIP_START,
                params: {
                    slipNo: slipNo
                }
            });
        } else {
            dispatch({
                type: types.DELETE_JOURNAL_START,
                params: {
                    journalNo: jourNo
                }
            });
        }
        setStatus('작성완료');
        handleClose();
        return Swal.fire({
            icon: 'error',
            title: '삭제되었습니다',
            showConfirmButton: '확인'
        });
    };
    //전표 업데이트
    const updateSlip = () => {
        console.log('updateSlip');
        dispatch({
            type: types.UPDATE_SLIP_START,
            params: {
                reportingDate: endDate,
                expenseReport: expenseReport
            }
        });
    };
    //전표 저장 및 업데이트
    const insertSlip = () => {
        if (selecSlip === '') {
            return Swal.fire({
                icon: 'warning',
                title: '전표를 선택해 주십시오',
                showConfirmButton: '확인'
            });
        } else if (slipNo !== 'new' && selecSlip.slipStatus == '승인완료') {
            return Swal.fire({
                icon: 'error',
                title: '승인된 항목은 수정할 수 없습니다.',
                showConfirmButton: '확인'
            });
        } else if (slipNo !== 'new' && slipStatus !== '승인완료') {
            console.log('stop');
            const updateSlipData = { slipObj: selecSlip, journalObj: journalData };
            dispatch({
                type: types.UPDATE_SLIP_START,
                params: {
                    updateSlipData: updateSlipData
                }
            });
            return Swal.fire({
                icon: 'info',
                title: '수정되었습니다',
                showConfirmButton: '확인'
            });
        } else {
            console.log(slipData);
            const insertSlipData = { slipObj: slipData, journalObj: journalData, slipStatus: '미결' };
            dispatch({
                type: types.INSERT_SLIP_START,
                params: {
                    insertSlipData: insertSlipData
                }
            });
            setSlipStatus('전체');
            setStatus('작성완료');
            return Swal.fire({
                icon: 'success',
                title: '저장되었습니다',
                showConfirmButton: '확인'
            });
        }
    };

    const approvalRequest = () => {
        console.log('승인요청');
        if (selecSlip === '') {
            return Swal.fire({
                icon: 'warning',
                title: '전표를 선택해 주십시오',
                showConfirmButton: '확인'
            });
        } else if (status == '작성중') {
            return Swal.fire({
                icon: 'warning',
                title: '작성을 마무리해 주십시오',
                showConfirmButton: '확인'
            });
        } else {
            const patchData = { slipNo: selecSlip.slipNo, slipStatus: '승인요청' };
            dispatch({
                type: types.APPROVAL_SLIP_REQUEST,
                patchData: patchData
            });
            return Swal.fire({
                icon: 'success',
                title: '승인요청 되었습니다',
                showConfirmButton: '확인'
            });
        }
    };
    //==========================분개=================================
    // 분개 조회
    const searchJour = (e) => {
        setSelecSlip(e.row);
        if (e.row.slipNo != 'new') {
            dispatch({
                type: types.SELECT_JOURNAL_START,
                params: {
                    slipNo: e.row.slipNo
                }
            });
        }
        setSlipNo(e.id);
    };
    //분개 로우 추가
    const addJour = () => {
        if (slipNo == '') {
            Swal.fire({
                icon: 'error',
                title: '전표부터 입력해 주시기 바랍니다',
                showConfirmButton: '확인'
            });
        } else {
            console.log('addJour');
            dispatch({
                type: types.INSERT_JOURNAL,
                params: {
                    journalNo: 'JOURNAL' + jourCount
                }
            });
            console.log(slipNo);
            setJourCount(parseInt(jourCount) + 1);
            console.log(jourCount);
        }
    };
    //분개 - 계정과목명 더블 클릭 --> 계정 선택 다이알로그
    //거래처 선택도 추가
    const itemSelect = (e) => {
        setSelecJour(e.row);
        setJourNo(e.row.journalNo);
        if (e.field == 'accountCode') {
            return Swal.fire({
                icon: 'error',
                title: '계정명을 눌러 주세요',
                showConfirmButton: '확인'
            });
        } else if (e.field == 'accountName') {
            setAccountSelectDialog(true);
        } else if (e.field == 'customerCode') {
            setCustomerCodeDialog(true);
        }
    };
    //분개 계정 선택
    const setAccountDetail = () => {
        setAccountSelectDialog(false);
        console.log(selecJour);
        console.log(journalData.filter((data) => data.journalNo !== jourNo));
        dispatch({
            type: types.INSERT_ACCOUNT,
            params: {
                accountCode: accountCode,
                accountName: accountName,
                selecJour: selecJour,
                journalData: journalData.filter((data) => data.journalNo !== jourNo)
            }
        });
    };
    const setCustomerDetail = () => {
        setCustomerCodeDialog(false);
        dispatch({
            type: types.INSERT_CUSTOMER,
            params: {
                customerCode: customerCode,
                customerName: customerName,
                selecJour: selecJour,
                journalData: journalData.filter((data) => data.journalNo !== jourNo)
            }
        });
    };
    //분개 저장 - 하나씩 ======> 전표와 분개 한번에 저장으로 구현
    // 지금은 업데이트 연습용으로 사용
    const insertJour = () => {
        console.log(selecJour);
        let jourData = { slipNo: slipNo, journalObj: selecJour };
        if (selecJour.slipNo !== 'new') {
            console.log('분개 수정');
            dispatch({
                type: types.UPDATE_JOURNAL_START,
                params: {
                    jourData: jourData
                }
            });
            return Swal.fire({
                icon: 'info',
                title: '수정되었습니다',
                showConfirmButton: '확인'
            });
        } else {
            console.log('분개 저장');
            dispatch({
                type: types.SAVE_JOURNAL_START,
                params: {
                    // slipNo: JSON.stringify(slipNo),
                    // journalObj: JSON.stringify(selecJour)
                    jourData: jourData //Object 형태로 값이 전달됨
                }
            });
            return Swal.fire({
                icon: 'success',
                title: '저장되었습니다',
                showConfirmButton: '확인'
            });
        }
    };

    //==========================분개상세=================================
    //분개상세 조회
    const searchDetail = (e) => {
        console.log(e);
        setSelecJour(e.row);
        setJourNo(e.row.journalNo);
        dispatch({
            type: types.SELECT_JOURNAL_DETAIL_START,
            params: {
                journalNo: e.row.journalNo
            }
        });
    };

    //분개 상세 추가
    const addDetail = () => {
        console.log('분개 상세 추가');
        if (selecJour === '') {
            Swal.fire({
                icon: 'error',
                title: '분개부터 선택해 주시기 바랍니다',
                showConfirmButton: '확인'
            });
        } else {
            dispatch({
                type: types.ADD_JOURNAL_DETAIL,
                params: {
                    journalDetailNo: 'JOURNALDETAIL' + jourCount
                }
            });
            setJourCount(parseInt(jourCount) + 1);
        }
    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <div align="center">
                    <Typography variant="h3">[ 검색조건 ]</Typography>
                    <div>
                        <TextField
                            id="startDate"
                            type={'date'}
                            variant={'standard'}
                            sx={{ mx: 1 }}
                            value={startDate}
                            defaultValue={monthFirstDay}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                            }}
                        />
                        <TextField
                            id="endDate"
                            type={'date'}
                            variant={'standard'}
                            sx={{ mx: 1 }}
                            value={endDate}
                            defaultValue={toDay}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                        />
                        <FormControl variant="standard" sx={{ mx: 1, mb: '10px', minWidth: 120 }}>
                            <Select
                                value={slipStatus}
                                defaultValue={slipStatus}
                                onChange={(e) => {
                                    setSlipStatus(e.target.value);
                                }}
                            >
                                <MenuItem value="전체">전체</MenuItem>
                                <MenuItem value="미결">미결</MenuItem>
                                <MenuItem value="반려">반려</MenuItem>
                                <MenuItem value="승인완료">승인</MenuItem>
                                {/* <MenuItem value="승인요청">요청</MenuItem> */}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<CalendarMonthIcon />}
                            sx={{ mx: 1, mb: '10px' }}
                            onClick={() => {
                                setStartDate(yearFirst);
                                setEndDate(yearLast);
                            }}
                        >
                            올해
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<SearchIcon />}
                            sx={{ mx: 1, mb: '10px' }}
                            onClick={searchSlip}
                        >
                            조회
                        </Button>
                    </div>
                </div>
                {/* =================================전표데이터그리드================================= */}
                <MainCard
                    content={false}
                    title="전표"
                    sx={{
                        '&MuiCard-root': { color: theme.palette.text.primary }
                    }}
                    secondary={
                        <Grid container spacing={1}>
                            <Grid item>
                                <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />} onClick={addSlip}>
                                    추가
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={deleteCheck}
                                    id="slipDelete"
                                >
                                    삭제
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" startIcon={<SaveIcon />} onClick={insertSlip}>
                                    저장/수정
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" startIcon={<TaskIcon />} onClick={approvalRequest}>
                                    승인요청
                                </Button>
                            </Grid>
                        </Grid>
                    }
                >
                    {/* table data grid */}
                    <Box
                        sx={{
                            height: 300,
                            width: '100%',
                            '& .MuiDataGrid-root': {
                                border: 'none',
                                '& .MuiDataGrid-cell': {
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                },
                                '& .MuiDataGrid-columnsContainer': {
                                    color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                },
                                '& .MuiDataGrid-columnSeparator': {
                                    color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }
                            }
                        }}
                    >
                        <DataGrid
                            rows={slipData}
                            columns={slipColumns}
                            // checkboxSelection
                            hideFooter
                            getRowId={(row) => row.slipNo}
                            onRowClick={searchJour}
                            onEditCellPropsChange={inputValue}
                            onCellEditStop={cellRender}
                        />
                        <DeleteCheckDialog open={openDialog} onClose={handleClose} deleteData={deleteData} />
                    </Box>
                </MainCard>
                {/* =================================분개데이터그리드================================= */}
                <MainCard
                    content={false}
                    title="분개"
                    secondary={
                        <Grid container spacing={1}>
                            {/* <Grid item>
                                <Button variant="contained" color="secondary">
                                    발주/납품 마감신청
                                </Button>
                            </Grid> */}
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={addJour}>
                                    분개추가
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={deleteCheck} id="jourDelete">
                                    분개삭제
                                </Button>
                            </Grid>
                            {/* >>>>>>>>>>>>>>>>>>>>>>>>updateJournal 연습  */}
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={insertJour}>
                                    분개저장/수정
                                </Button>
                            </Grid>
                        </Grid>
                    }
                >
                    {/* table data grid */}
                    <Box
                        sx={{
                            height: 300,
                            width: '100%',
                            '& .MuiDataGrid-root': {
                                border: 'none',
                                '& .MuiDataGrid-cell': {
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                },
                                '& .MuiDataGrid-columnsContainer': {
                                    color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                },
                                '& .MuiDataGrid-columnSeparator': {
                                    color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }
                            }
                        }}
                    >
                        <DataGrid
                            rows={journalData}
                            columns={indignationColumns}
                            //checkboxSelection
                            hideFooter
                            getRowId={(row) => row.journalNo}
                            onCellClick={searchDetail}
                            onCellDoubleClick={itemSelect}
                            onEditCellPropsChange={inputValue}
                            onCellEditStop={cellRender}
                        />
                        <AccountDialog
                            open={accountSelectDialog}
                            onClose={setAccountDetail}
                            setAccountCode={setAccountCode}
                            setAccountName={setAccountName}
                        />
                        <CustomerDialog
                            open={customerCodeDialog}
                            onClose={setCustomerDetail}
                            setCustomerCode={setCustomerCode}
                            setCustomerName={setCustomerName}
                        />
                    </Box>
                </MainCard>
                {/* =================================분개상세데이터그리드================================= */}
                <MainCard
                    content={false}
                    title="분개상세"
                    secondary={
                        <Grid container spacing={1}>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={addDetail}>
                                    분개상세 추가
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary">
                                    분개상세 삭제
                                </Button>
                            </Grid>
                        </Grid>
                    }
                >
                    {/* table data grid */}
                    <Box
                        sx={{
                            height: 300,
                            width: '100%',
                            '& .MuiDataGrid-root': {
                                border: 'none',
                                '& .MuiDataGrid-cell': {
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                },
                                '& .MuiDataGrid-columnsContainer': {
                                    color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                },
                                '& .MuiDataGrid-columnSeparator': {
                                    color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }
                            }
                        }}
                    >
                        <DataGrid
                            rows={journalDetailData}
                            columns={indignationDetailColumns}
                            hideFooter
                            //checkboxSelection
                            getRowId={(row) => row.journalDetailNo}
                        />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default SlipForm;
