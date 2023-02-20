import React, { useEffect, useState } from 'react';
import moment from 'moment';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../reducer/AccountReducer';

// material-ui
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import ApprovalIcon from '@mui/icons-material/Approval';
import RefreshIcon from '@mui/icons-material/Refresh';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import { gridSpacing } from '../../../../../template/store/constant';

//전표 그리드 세팅
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

//분개 그리드 세팅
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
const ApprovalManager = () => {
    //데이터 뽑아오기
    const slipData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.approvalSlipList);
    const journalData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.JournalList);

    //날짜 세팅
    const theme = useTheme();
    let year = moment(new Date()).format('yyyy');
    let month = moment(new Date()).format('MM');
    //let date = moment(new Date()).format("DD");
    const today = year + '-' + month + '-' + new Date().getDate();
    const monthFirst = year + '-' + month + '-01';
    const yearFirst = year + '-01-01';
    const yearLast = year + '-12-31';

    //useState
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(monthFirst);
    const [endDate, setEndDate] = useState(today);
    const [slipStatus] = useState('승인요청');
    const [positionGridApi, setPositionGridApi] = useState();
    const [slipNo, setSlipNo] = useState('');

    const approvalSearchData = () => {
        dispatch({
            type: types.SEARCH_AM_SLIP_REQUEST,
            params: {
                startDate: moment(startDate).format('yyyy-MM-DD'),
                endDate: moment(endDate).format('yyyy-MM-DD'),
                slipStatus: slipStatus
            }
        });
    };

    const thisYear = () => {
        setStartDate(yearFirst);
        setEndDate(yearLast);
    };

    // //========================== 분개조회 ==========================
    // useEffect(() => {
    //     if (slipNo === '' || slipNo === 'new') return;
    //     dispatch({
    //         type: types.SEARCH_AM_JOURNAL_REQUEST,
    //         params: { slipNo: slipData.slipNo }
    //     });
    // }, [slipNo]); // SlipGrid 컴포넌트에서 보낸 slipNo 가 바뀔 때마다, slipNo 를 파라미터로 분개 List를 가져와라. setData 해라.

    const searchJour = (e) => {
        //setSelecSlip(e.row);
        console.log(e);
        if (e.row.slipNo != 'new') {
            dispatch({
                type: types.SELECT_JOURNAL_START,
                params: {
                    slipNo: e.row.slipNo
                }
            });
        }
        //setSlipNo(e.id);
    };
    //========================== 그리드초기화 ==========================
    const initalBtn = () => {
        positionGridApi.selectAll(); // 그리드에 뿌려진 모든 데이터를 선택해라.
        const allData = positionGridApi.getSelectedRows(); // 선택된 데이터를 담아라.
        positionGridApi.updateRowData({ remove: allData }); // 그리드에서 제거해라
    };

    //========================== 전표승인 ===============================
    const approvalBtn = async () => {
        let selectedData = positionGridApi.getSelectedRows(); //선택한 모든 로우
        let approvalData = selectedData.map((cv) => {
            cv.slipStatus = '승인'; // 뒷단에서 반려도 추가를 할경우  전표 등록할때 사용하는 FormControl 을 사용 하여 승인이면 true 반려면 false 를 하고 넘겨 주길 바랍니다 ㅎㅎ
            cv.approvalDate = moment(new Date()).format('yyyy-MM-DD'); //승인 날짜
            cv.approvalEmpCode = sessionStorage.getItem('empCodeInfo_token');
            cv.approvalEmpName = sessionStorage.getItem('empNameInfo_token');
            return cv;
        });
        dispatch({
            type: types.UPDATE_AM_SLIP_REQUEST,
            params: { approvalData: approvalData }
        });
        alert(` ${approvalData.length} 건 의 전표가 승인이 되었습니다. `);
        positionGridApi.updateRowData({ remove: selectedData });
    };
    //========================== 전표반려 ===============================
    const companionBtn = async () => {
        let selectedData = positionGridApi.getSelectedRows();
        let companionData = selectedData.map((cv) => {
            cv.slipStatus = '반려'; // 뒷단에서 반려도 추가를 할경우  전표 등록할때 사용하는 FormControl 을 사용 하여 승인이면 true 반려면 false 를 하고 넘겨 주길 바랍니다 ㅎㅎ
            cv.companionDate = moment(new Date()).format('yyyy-MM-DD');
            cv.companionEmpCode = sessionStorage.getItem('empCodeInfo_token');
            cv.companionEmpName = sessionStorage.getItem('empNameInfo_token');
            return cv;
        });
        dispatch({
            type: types.UPDATE_AM_SLIP_REQUEST,
            params: { approvalData: companionData }
        });
        alert(` ${companionData.length} 건 의 전표가 승인이 되었습니다. `);
        positionGridApi.updateRowData({ remove: selectedData });
    };
    //========================== 전표그리드 row를 눌렀을 때, 이벤트 ==========================
    const slipChange = () => {
        const rowData = positionGridApi.getSelectedRows(); // 선택된 row 정보
        setSlipNo(rowData[0].slipNo); // row 정보의 slipNo를 세팅해라. JournalGrid 컴포넌트로 보내기 위함.
    };

    const onGridReady = (params) => {
        setPositionGridApi(params.api);
        params.api.sizeColumnsToFit(); // 그리드 초기화 시 칼럼 사이즈 자동조절.
    }; // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.

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
                            defaultValue={monthFirst}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                3;
                            }}
                        />
                        <TextField
                            id="endDate"
                            type={'date'}
                            variant={'standard'}
                            sx={{ mx: 1 }}
                            value={endDate}
                            defaultValue={today}
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
                {/* =================================전표승인요청데이터그리드================================= */}
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
                                <Button variant="contained" color="secondary" onClick={companionBtn} startIcon={<CallMissedIcon />}>
                                    반려
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={initalBtn} startIcon={<RefreshIcon />}>
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
                        <DataGrid
                            hideFooter
                            rows={slipData}
                            columns={slipColumns}
                            //onCellClicked={slipChange}
                            rowSelection="multiple" // 그리드 여러개 선택가능
                            onGridReady={onGridReady}
                            onRowClick={searchJour}
                            getRowId={(row) => row.slipNo}
                        />
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
