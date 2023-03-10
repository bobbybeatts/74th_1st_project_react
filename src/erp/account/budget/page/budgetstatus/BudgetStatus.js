import React, { useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';

import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from '../../../../../template/store/constant';
import MainCard from 'template/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as type from '../../reducer/BudgetReducer';
import * as types from '../../../base/reducer/BaseReducer';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import SearchDeptDialog from '../dialog/SearchDeptDialog';
import SearchYearDialog from '../dialog/SearchYearDialog';

// ==============================|| SAMPLE PAGE ||============================== //

const BudgetStatus = () => {
    const budgetStatus = useSelector((state) => state.RootReducers.AccReducer.BudgetReducer.budgetList);

    const theme = useTheme();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [workplace, setWorkplace] = useState('');
    const [dName, setDname] = useState('');
    const [year, setYear] = useState('');

    const [AccountCode, setAccountCode] = useState('');
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

    const onRowSelect = (e) => {
        setAccountCode(e.row.accountInnerCode);
        dispatch({
            type: types.SEARCH_DEPT_REQUEST,
            params: {
                accountInnerCode: e.row.accountInnerCode
            }
        });
    };

    const onSelectAccount = (e) => {
        console.log(e.row);
        dispatch({
            type: types.SEARCH_DETAIL_ACCOUNT_REQUEST,
            params: {
                code: e.row.accountInnerCode
            }
        });
        setAccountCode(e.row.accountInnerCode);
    };

    const selectBudgetStatus = () => {
        dispatch({
            type: type.SELECT_BUDGET_STATUS_REQUEST,
            params: {
                workplaceCode: workplace,
                accountPeriodNo: year,
                deptCode: dname
            }
        });
        console.log(budgetStatus);
    };

    //??????????????????
    const budgetStatusColumns = [
        {
            headerName: '????????????????????????',
            cellStyle: {
                textAlign: 'center'
            },
            children: [
                {
                    headerName: '?????? ?????? ??????',
                    field: 'accountInnerCode',
                    key: 'accountInnerCode',
                    cellStyle: { textAlign: 'center' },
                    width: 125
                },
                { headerName: '?????? ??????', field: 'accountName', kye: 'accountName', cellStyle: { textAlign: 'center' }, width: 90 },
                { headerName: '?????? ??????', field: 'ABR', key: 'ABR', cellStyle: { textAlign: 'center' }, width: 110 },
                { headerName: '?????? ??????', field: 'annualBudget', key: 'annualBudget', cellStyle: { textAlign: 'center' }, width: 110 },
                {
                    headerName: '?????? ????????????',
                    field: 'remainingBudget',
                    key: 'remainingBudget',
                    cellStyle: { textAlign: 'center' },
                    width: 135
                },
                {
                    headerName: '?????? ?????????',
                    field: 'budgetExecRate',
                    key: 'budgetExecRate',
                    cellStyle: { textAlign: 'center' },
                    width: 120
                }
            ]
        },
        {
            headerName: '????????????????????????',
            cellStyle: {
                textAlign: 'center'
            },
            children: [
                { headerName: '?????? ??????', field: 'AMBR', key: 'AMBR', cellStyle: { textAlign: 'center' }, width: 110 },
                { headerName: '?????? ??????', field: 'Budget', key: 'Budget', cellStyle: { textAlign: 'center' }, width: 110 },
                {
                    headerName: '?????? ????????????',
                    field: 'remainingMonthBudget',
                    key: 'remainingMonthBudget',
                    cellStyle: { textAlign: 'center' },
                    width: 135
                },
                {
                    headerName: '?????? ?????????',
                    field: 'monthBudgetExecRate',
                    key: 'monthBudgetExecRate',
                    cellStyle: { textAlign: 'center' },
                    width: 120
                }
            ]
        }
    ];

    const budgetComparisonColumns = [
        { headerName: '??????', field: 'budgetDate', key: 'budgetDate', cellStyle: { textAlign: 'center' }, width: 150 },
        { headerName: '????????????', field: 'appBudget', kye: 'appBudget', cellStyle: { textAlign: 'center' }, width: 150 },
        { headerName: '????????????', field: 'orgBudget', key: 'orgBudget', cellStyle: { textAlign: 'center' }, width: 150 },
        { headerName: '????????????', field: 'execPerform', key: 'execPerform', cellStyle: { textAlign: 'center' }, width: 150 },
        {
            headerName: '????????????',
            field: 'budgetAccountComparison',
            key: 'budgetAccountComparison',
            cellStyle: { textAlign: 'center' },
            width: 150
        }
    ];

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <div align="center">
                    <MainCard
                        content={false}
                        title=" "
                        sx={{
                            '&MuiCard-root': { color: theme.palette.text.primary }
                        }}
                        secondary={
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Paper
                                        id="fisicalYear"
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 150 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="??????"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            value={year}
                                        />
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onOpen}>
                                            <SearchIcon />
                                        </IconButton>
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    </Paper>
                                    <SearchYearDialog open={openDialog} onClose={onClose} setYear={setYear} />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        id="workplaceName"
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 150 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="?????????"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            value={workplace}
                                        />
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onOpen2}>
                                            <SearchIcon />
                                        </IconButton>
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    </Paper>
                                    <SearchDeptDialog
                                        open2={openDialog2}
                                        onClose2={onClose2}
                                        setWorkplace={setWorkplace}
                                        setDname={setDname}
                                    />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        id="deptName"
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 100 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="??????"
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
                            <AgGridReact
                                rowData={budgetStatus}
                                columnDefs={budgetStatusColumns}
                                getRowId={(row) => row.accountInnerCode}
                                onRowSelect={onSelectAccount}
                            />
                        </Box>
                    </MainCard>
                </div>
            </Grid>
            <Grid item xs={9}>
                <div align="center">
                    <MainCard
                        content={false}
                        title=" "
                        sx={{
                            '&MuiCard-root': { color: theme.palette.text.primary }
                        }}
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
                            <DataGrid rows={budgetStatus} columns={budgetComparisonColumns} getRowId={(row) => row.budgetDate} />
                        </Box>
                    </MainCard>
                </div>
            </Grid>
        </Grid>
    );
};

export default BudgetStatus;
