// material-ui
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import * as types from '../../../base/reducer/BaseReducer';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import { gridSpacing } from '../../../../../template/store/constant';
import MainCard from 'template/ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';

import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';

import YearDialog from '../dialog/YearDialog';
import DeptDialog from '../dialog/DeptDialog';

import TotalGrowthBarChart from 'template/ui-component/cards/Skeleton/TotalGrowthBarChart';

// ==============================|| SAMPLE PAGE ||============================== //

// 열넓이 xs의 경우, xs={12}크기에 관계없이 전체 뷰포트 너비를 차지하도록 구성 요소의 크기를 조정
// <Grid item xs="auto"> 처럼 그리드를 가변으로 길이를 줄 수도 있음.
// spacing의 경우 간격. theme.spacing()으로 변경가능. <Grid container spacing={2}> 2간격으로 띄움.
// https://mui.com/material-ui/react-grid/ -- <Grid> 설정

// <TextField id="111111" label="처음에뜨는값" variant="filled" /> variant에는 outline, filled, standard << 이거별로 기본텍스트박스가 바뀜.

// Grid 요소가 내부적으로 CSS flexbox를 사용 --> <Box>
// https://mui.com/system/grid/#row-gap-amp-column-gap -- 그리드의 CSS

// 계정 + 계정상세 말고 한방에 --> https://mui.com/material-ui/react-autocomplete/ Grouped 이걸로 해봐도 될듯.

// 예산신청 계정관련 : https://mui.com/material-ui/react-text-field/

const BudgetRequest = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [workplace, setWorkplace] = useState('');
    const [dName, setDname] = useState('');
    const [year, setYear] = useState('');

    const [AccountCode, setAccountCode] = useState('');
    const [AccountName, setAccountName] = useState('');

    const accountList = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.accountCodeList);
    const accountDetailData = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.accountDetailList);

    const accountColumns = [
        { headerName: '계정과목코드', field: 'accountInnerCode', align: 'center', width: 120 },
        { headerName: '계정과목', field: 'accountName', align: 'center', width: 480 }
    ];
    const accountDetailcolums = [
        { field: 'accountInnerCode', headerName: '계정과목코드', width: 120, align: 'center' },
        { field: 'accountName', headerName: '계정과목명', width: 305, align: 'center' }
    ];

    const onSelectAccount = (e) => {
        console.log(e.row);
        dispatch({
            type: types.SEARCH_DETAIL_ACCOUNT_REQUEST,
            params: {
                code: e.row.accountInnerCode
            }
        });
        setAccountCode(e.row.accountInnerCode);
        setAccountName(e.row.accountName);
    };

    const onClose = () => {
        setOpenDialog(false);
    };

    const onClose2 = () => {
        setOpenDialog2(false);
    };

    const onOpen = () => {
        setOpenDialog(true);
    };

    const onOpen2 = () => {
        setOpenDialog2(true);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item sm={7}>
                <MainCard
                    content={false}
                    title="계정과목선택"
                    sx={{
                        '&MuiCard-root': { color: theme.palette.text.primary }
                    }}
                    secondary={
                        <Grid container spacing={1}>
                            <Grid item>
                                <Paper
                                    id="startDate"
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 150 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="회계연도"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        value={year}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onOpen}>
                                        <SearchIcon />
                                    </IconButton>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </Paper>
                                <YearDialog open={openDialog} onClose={onClose} setYear={setYear} />
                            </Grid>
                            <Grid item>
                                <Paper
                                    id="startDate"
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 150 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="사업장명"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        value={workplace}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onOpen2}>
                                        <SearchIcon />
                                    </IconButton>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </Paper>
                                <DeptDialog open2={openDialog2} onClose2={onClose2} setWorkplace={setWorkplace} setDname={setDname} />
                            </Grid>
                            <Grid item>
                                <Paper
                                    id="startDate"
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 100 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="부서명"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        value={dName}
                                    />
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </Paper>
                            </Grid>
                        </Grid>
                    }
                >
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
                            rows={accountList}
                            columns={accountColumns}
                            getRowId={(row) => row.accountInnerCode}
                            onRowClick={onSelectAccount}
                        />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item sm={5}>
                <MainCard content={false} title="계정상세선택">
                    {/* table data grid */}
                    <Box
                        sx={{
                            height: 315,
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
                        <DataGrid rows={accountDetailData} columns={accountDetailcolums} getRowId={(row) => row.accountInnerCode} />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item sm={6}>
                <MainCard content={false} title="전기예산신청">
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
                        <TextField id="1month" label="1월" type="password" autoComplete="current-password" />
                        <TextField id="2month" label="2월" type="password" autoComplete="current-password" />
                        <TextField id="3month" label="3월" type="password" autoComplete="current-password" />
                        <TextField id="4month" label="4월" type="password" autoComplete="current-password" />
                        <TextField id="5month" label="5월" type="password" autoComplete="current-password" />
                        <TextField id="6month" label="6월" type="password" autoComplete="current-password" />
                        <TextField id="7month" label="7월" type="password" autoComplete="current-password" />
                        <TextField id="8month" label="8월" type="password" autoComplete="current-password" />
                        <TextField id="9month" label="9월" type="password" autoComplete="current-password" />
                        <TextField id="10month" label="10월" type="password" autoComplete="current-password" />
                        <TextField id="11month" label="11월" type="password" autoComplete="current-password" />
                        <TextField id="12month" label="12월" type="password" autoComplete="current-password" />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default BudgetRequest;
