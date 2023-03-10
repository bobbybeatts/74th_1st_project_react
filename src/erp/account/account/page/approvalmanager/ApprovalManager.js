import React, { useState } from 'react';
// material-ui
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import ApprovalIcon from '@mui/icons-material/Approval';
import RefreshIcon from '@mui/icons-material/Refresh';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';

// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import { gridSpacing } from '../../../../../template/store/constant';
// assets
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../reducer/AccountReducer';
import moment from 'moment/moment';

import Swal from 'sweetalert2';

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
        type: 'singleSelect',
        valueOptions: ['대변', '차변']
    },
    {
        headerName: '차변',
        field: 'leftDebtorPrice'
        //valueFormatter:' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
    },
    {
        headerName: '대변',
        field: 'rightCreditsPrice'
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

const ApprovalManager = () => {
    const slipData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.approvalSlipList);
    const journalData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.approvalJournalList);

    let year = moment(new Date()).format('yyyy');
    let month = moment(new Date()).format('MM');
    //let date = moment(new Date()).format("DD");
    let toDay = moment(new Date()).format('yyyy-MM-DD');
    let monthFirstDay = year + '-' + month + '-01';
    const yearFirst = year + '-01-01';
    const yearLast = year + '-12-31';

    const theme = useTheme();
    const dispatch = useDispatch(); // useDispatch()는 리덕스 내장 함순데 밖에서 사용하기 위해서 dispatch변수 적어준다.
    const [slipStatus] = useState('승인요청');
    const [startDate, setStartDate] = useState(monthFirstDay); //시작 날짜
    const [endDate, setEndDate] = useState(toDay);
    const [selecSlip, setSelecSlip] = useState('');

    //==========================전표CRUD=================================
    //조회
    const approvalSearchData = () => {
        dispatch({
            type: types.SEARCH_AM_SLIP_REQUEST,
            params: {
                startDate: moment(startDate).format('yyyy-MM-DD'),
                endDate: moment(endDate).format('yyyy-MM-DD'),
                slipStatus: slipStatus
            }
        });
        console.log(slipData);
    };
    //전표 승인
    const approvalBtn = () => {
        const approvalData = { slipNo: selecSlip.slipNo, slipStatus: '승인완료', approvalDate: toDay };
        console.log(approvalData);
        dispatch({
            type: types.UPDATE_AM_SLIP_REQUEST,
            params: { approvalData: approvalData }
        });
    };
    //==========================분개=================================
    // 분개 조회
    const searchJour = (e) => {
        setSelecSlip(e.row);
        console.log(e.row);
        if (e.row.slipNo != 'new') {
            dispatch({
                type: types.SEARCH_AM_JOURNAL_REQUEST,
                params: {
                    slipNo: e.row.slipNo
                }
            });
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
                            onClick={approvalSearchData}
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
                                <Button variant="contained" color="secondary" onClick={approvalBtn} startIcon={<ApprovalIcon />}>
                                    전표승인
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    //onClick={companionBtn}
                                    startIcon={<CallMissedIcon />}
                                >
                                    반려
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    //onClick={initalBtn}
                                    startIcon={<RefreshIcon />}
                                >
                                    초기화
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
                        <DataGrid rows={slipData} columns={slipColumns} hideFooter getRowId={(row) => row.slipNo} onRowClick={searchJour} />
                    </Box>
                </MainCard>
                {/* =================================분개데이터그리드================================= */}
                <MainCard content={false} title="분개">
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
                        <DataGrid hideFooter rows={journalData} columns={indignationColumns} getRowId={(row) => row.journalNo} />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ApprovalManager;
