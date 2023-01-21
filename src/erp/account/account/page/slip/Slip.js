import React, {useCallback, useState} from 'react';
// material-ui
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MyDialog from 'util/LogiUtil/MyDialog';
import DeleteCheckDialog from './DeleteCheckDialog'
// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import {gridSpacing} from '../../../../../template/store/constant';
// assets
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../reducer/AccountReducer';
import moment from 'moment/moment'

//Columns
//전표칼럼
const slipColumns = [
    { width: '30', headerCheckboxSelection: true, checkboxSelection: true, key:'slipCheck',field:' '}, //체크박스
    { width: '90', headerName: '기수일련번호', field: 'accountPeriodNo' , key:'accountPeriodNo'},
    { width: '150', headerName: '전표일련번호', field: 'slipNo' , key:'slipNo'},
    { headerName: '작성날짜', field: 'reportingDate' , key:'reportingDate'},
    { headerName: '작성자코드', field: 'reportingEmpCode' , key:'reportingEmpCode'},
    { width: '150', headerName: '품의내역', field: 'expenseReport', editable: true , key:'expenseReport'}, // editable : 편집가능
    { headerName: '승인자', field: 'reportingEmpName' , key:'reportingEmpName'},
    { headerName: '승인상태', field: 'slipStatus', key:'slipStatus' }
];
//분개칼럼
const indignationColumns = [
    { width: '50', headerCheckboxSelection: true, checkboxSelection: true,field:' '}, //체크박스
    { headerName: '분개일련번호', field: 'journalNo', editable: true },
    { headerName: '계정코드', field: 'accountCode' },
    { headerName: '계정명', field: 'accountName' },
    {
        headerName: '대차구분',
        field: 'balanceDivision',
        editable: true,
        cellEditor: 'agSelectCellEditor', //콤보 생성
        //콤보List
        cellEditorParams: {
            values: ['대변', '차변']
        }
    },
    { headerName: '거래처코드', field: 'customerCode' },
    { headerName: '거래처명', field: 'customerName', hide: true },
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
    { width: '50', headerCheckboxSelection: true, checkboxSelection: true ,field:' '}, //체크박스
    { headerName: '분개번호', field: 'journalDetailNo',width: 250 },
    { headerName: '계정명', field: 'accountControlName',width: 250 },
    { headerName: '계정내용', field: 'accountControlType',width: 250 },
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

    const theme = useTheme();
    const dispatch = useDispatch(); // useDispatch()는 리덕스 내장 함순데 밖에서 사용하기 위해서 dispatch변수 적어준다.
    const [slipStatus, setSlipStatus] = useState('전체');
    const [startDate, setStartDate] = useState(monthFirstDay); //시작 날짜
    const [endDate, setEndDate] = useState(toDay);

    const [slipNo, setSlipNo] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const close = () => {
        setOpenDialog(false);
    };
    const deleteCheck = () => {
         setOpenDialog(true);
    };

    // const [newAccount, setNewAccount] = useState({
    //     accountInnerCode: "",
    //     parentAccountInnercode: "",
    //     accountCode: "",
    //     accountCharacter: "",
    //     accountName: "",
    //     accountUseCheck: "",
    //     accountDivision: "",
    //     accountDescription: "",
    //     groupCode: "",
    //     editable: "",
    //     accountInnerName: ""
    // })
    // const accountInnerCodeChange = e => {
    //     setNewAccount({
    //         ...newAccount,
    //         accountInnerCode: e.target.value,
    //         accountCode: e.target.value
    //     })
    // }
    
//==========================전표=================================
    const searchSlip = () => {
        dispatch({//const dispatch = useDispatch();
            type : types.SELECT_SLIP_START,
            params : {
                startDate : startDate,
                endDate : endDate,
                slipStatus : slipStatus
            }
        })
        console.log(slipData);
    }

    const insertSlip = () => {
        console.log("전표 추가");
        dispatch({
            type: types.ADD_SLIP
        })
        }
    // const deleteCheck = () => {
    //     return Swal.fire({
    //         icon: 'error',
    //         title: '정말 삭제 하시겠습니까?',
    //         showConfirmButton: 'true'
    //     })
    // }
    const deleteSlip = () => { //e는 버튼임 버튼을 주면 안됨
        console.log(slipNo+"삭제 좀 되라");
        dispatch({
            type: types.DELETE_SLIP_START,
            params:{
                slipNo:slipNo
            }
        })
        close();
    }

    const updateSlip = () => {
        console.log("updateSlip");
    }
//==========================분개=================================
    const searchJour= (e) => {
        dispatch({
            type : types.SELECT_JOURNAL_START,
            params : {
                slipNo : e.row.slipNo
            }
        });
        setSlipNo(e.id);
    }
//==========================분개상세=================================
    const searchDetail = (e) => {
        // console.log(e);
        dispatch({
            type: types.SELECT_JOURNAL_DETAIL_START,
            params : {
                journalNo : e.row.journalNo
            }
        })
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <div Align="center">
                    <Typography variant="h3">[ 검색조건 ]</Typography>
                    <div>
                        <TextField
                            id="startDate"
                            type={"date"}
                            variant={"standard"}
                            sx={{mx: 1}}
                            value={startDate}
                            defaultValue={monthFirstDay}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                            }}/>
                        <TextField
                            id="endDate"
                            type={"date"}
                            variant={"standard"}
                            sx={{mx: 1}}
                            value={endDate}
                            defaultValue={toDay}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                        />
                        <FormControl variant="standard" sx={{mx: 1, mb: "10px", minWidth: 120}} >
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
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<CalendarMonthIcon/>}
                            sx={{mx: 1, mb: "10px"}}
                            onClick={() => {
                                setStartDate(yearFirst);
                                setEndDate(yearLast);
                            }}
                        >
                            올해
                        </Button>
                        <Button variant="contained" color="secondary" startIcon={<SearchIcon/>} sx={{mx: 1, mb: "10px"}} onClick={searchSlip}>
                            조회
                        </Button>
                    </div>
                </div>
                <MyDialog close={close} open={openDialog}>
                <div>
                     <DeleteCheckDialog onSubmit={deleteSlip} />
               </div>
                </MyDialog>
                {/* =================================전표데이터그리드================================= */}
                <MainCard
                    content={false}
                    title="전표"
                    sx={{
                        '&MuiCard-root': {color: theme.palette.text.primary}
                    }}
                    secondary={<Grid container spacing={1}>
                        <Grid item>
                            <Button variant="contained" color="secondary" startIcon={<AddCircleIcon/>} onClick={insertSlip}>추가</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>} onClick={deleteCheck}>삭제</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" startIcon={<SaveIcon/>} onClick={updateSlip}>저장</Button>
                        </Grid>
                    </Grid>}
                >
                    {/* table data grid */}
                    <Box
                        sx={{
                            height: 300, width: '100%', '& .MuiDataGrid-root': {
                                border: 'none', '& .MuiDataGrid-cell': {
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }, '& .MuiDataGrid-columnsContainer': {
                                    color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }, '& .MuiDataGrid-columnSeparator': {
                                    color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }
                            }
                        }}
                    >
                        <DataGrid
                            rows={slipData}
                            columns={slipColumns}
                            checkboxSelection
                            hideFooter
                            getRowId={(row) => row.slipNo}
                            onCellClick={searchJour}
                        />
                    </Box>
                </MainCard>
                {/* =================================분개데이터그리드================================= */}
                <MainCard
                    content={false}
                    title="분개"
                    secondary={<Grid container spacing={1}>
                        <Grid item>
                            <Button variant="contained" color="secondary" >발주/납품 마감신청</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary">분개추가</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary">분개삭제</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary">분개저장</Button>
                        </Grid>
                    </Grid>}
                >
                    {/* table data grid */}
                    <Box
                        sx={{
                            height: 300, width: '100%', '& .MuiDataGrid-root': {
                                border: 'none', '& .MuiDataGrid-cell': {
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }, '& .MuiDataGrid-columnsContainer': {
                                    color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }, '& .MuiDataGrid-columnSeparator': {
                                    color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }
                            }
                        }}
                    >
                        <DataGrid
                            rows={journalData}
                            columns={indignationColumns}
                            checkboxSelection
                            hideFooter
                            getRowId={(row) => row.journalNo}
                            onCellClick={searchDetail}
                        />
                    </Box>
                </MainCard>
                {/* =================================분개상세데이터그리드================================= */}
                <MainCard
                    content={false}
                    title="분개상세"
                    secondary={<Grid item>
                        <Button variant="contained" color="secondary">분개상세 저장</Button>
                    </Grid>}
                >
                    {/* table data grid */}
                    <Box
                        sx={{
                            height: 300, width: '100%', '& .MuiDataGrid-root': {
                                border: 'none', '& .MuiDataGrid-cell': {
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }, '& .MuiDataGrid-columnsContainer': {
                                    color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }, '& .MuiDataGrid-columnSeparator': {
                                    color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                }
                            }
                        }}
                    >
                        <DataGrid
                            rows={journalDetailData}
                            columns={indignationDetailColumns}
                            hideFooter
                            checkboxSelection
                            getRowId={(row) => row.journalDetailNo
                            }
                        />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
}

export default SlipForm;