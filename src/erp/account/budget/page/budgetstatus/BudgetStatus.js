import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Paper } from '@mui/material';
import { AgGridReact } from "ag-grid-react";
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from '../../../../../template/store/constant';
import MainCard from 'template/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import SearchDeptDialog from "../dialog/SearchDeptDialog";
import SearchYearDialog from "../dialog/SearchYearDialog";
import * as types from '../../reducer/BudgetReducer';

// ==============================|| SAMPLE PAGE ||============================== //

const BudgetStatus = () => {
    const budgetStatus = useSelector((state) => state.RootReducers.AccReducer.BudgetReducer.budgetList);

    const theme = useTheme();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [dName, setDname] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [year, setYear] = useState('');
    const onClose = () => {
        setOpenDialog(false);
    };

    const onClose2 = () => {
        setOpenDialog2(false);

        console.log(year);
        console.log(dName);
        console.log(workplace);

        findBudgetStatus();


        const onOpen = () => {
            setOpenDialog(true);
        };

        const onOpen2 = () => {
            setOpenDialog2(true);
        };
        const findBudgetStatus = () => {
            dispatch({
                type: types.SELECT_BUDGET_STATUS_REQUEST,
                params: {
                    accountPeriodNo: year,
                    workplaceCode: workplace,
                    deptCode: dName,

                }
            });
            console.log(budgetStatus);
        };
        //예산실적현황
        const budgetStatusColumns = [
            {
                headerName: "누적예산대비실적",
                cellStyle: {
                    textAlign: "center",
                },
                children: [
                    {
                        headerName: '계정 과목 코드',
                        field: 'accountInnerCode',
                        key: 'accountInnerCode',
                        cellStyle: {textAlign: "center"},
                        width: 125
                    },
                    {
                        headerName: '계정 과목',
                        field: 'accountName',
                        kye: 'accountName',
                        cellStyle: {textAlign: "center"},
                        width: 90
                    },
                    {headerName: '누계 실적', field: 'ABR', key: 'ABR', cellStyle: {textAlign: "center"}, width: 110},
                    {
                        headerName: '누계 예산',
                        field: 'annualBudget',
                        key: 'annualBudget',
                        cellStyle: {textAlign: "center"},
                        width: 110
                    },
                    {
                        headerName: '누계 잔여예산',
                        field: 'remainingBudget',
                        key: 'remainingBudget',
                        cellStyle: {textAlign: "center"},
                        width: 135
                    },
                    {
                        headerName: '누계 집행율',
                        field: 'budgetExecRate',
                        key: 'budgetExecRate',
                        cellStyle: {textAlign: "center"},
                        width: 120
                    },
                ],
            },
            {
                headerName: "당월예산대비실적",
                cellStyle: {
                    textAlign: "center",
                },
                children: [
                    {headerName: '당월 실적', field: 'AMBR', key: 'AMBR', cellStyle: {textAlign: "center"}, width: 110},
                    {headerName: '당월 예산', field: 'Budget', key: 'Budget', cellStyle: {textAlign: "center"}, width: 110},
                    {
                        headerName: '당월 잔여예산',
                        field: 'remainingMonthBudget',
                        key: 'remainingMonthBudget',
                        cellStyle: {textAlign: "center"},
                        width: 135
                    },
                    {
                        headerName: '당월 집행율',
                        field: 'monthBudgetExecRate',
                        key: 'monthBudgetExecRate',
                        cellStyle: {textAlign: "center"},
                        width: 120
                    },
                ],
            },
            {
                headerName: '누적예산대비실적',
                cellStyle: {
                    textAlign: 'center'
                },
                children: [
                    {
                        headerName: '계정 과목 코드',
                        field: 'accountInnerCode',
                        key: 'accountInnerCode',
                        cellStyle: {textAlign: 'center'},
                        width: 125
                    },
                    {
                        headerName: '계정 과목',
                        field: 'accountName',
                        kye: 'accountName',
                        cellStyle: {textAlign: 'center'},
                        width: 90
                    },
                    {headerName: '누계 실적', field: 'ABR', key: 'ABR', cellStyle: {textAlign: 'center'}, width: 110},
                    {
                        headerName: '누계 예산',
                        field: 'annualBudget',
                        key: 'annualBudget',
                        cellStyle: {textAlign: 'center'},
                        width: 110
                    },
                    {
                        headerName: '누계 잔여예산',
                        field: 'remainingBudget',
                        key: 'remainingBudget',
                        cellStyle: {textAlign: 'center'},
                        width: 135
                    },
                    {
                        headerName: '누계 집행율',
                        field: 'budgetExecRate',
                        key: 'budgetExecRate',
                        cellStyle: {textAlign: 'center'},
                        width: 120
                    }
                ]
            },
            {
                headerName: '당월예산대비실적',
                cellStyle: {
                    textAlign: 'center'
                },
                children: [
                    {headerName: '당월 실적', field: 'AMBR', key: 'AMBR', cellStyle: {textAlign: 'center'}, width: 110},
                    {headerName: '당월 예산', field: 'Budget', key: 'Budget', cellStyle: {textAlign: 'center'}, width: 110},
                    {
                        headerName: '당월 잔여예산',
                        field: 'remainingMonthBudget',
                        key: 'remainingMonthBudget',
                        cellStyle: {textAlign: 'center'},
                        width: 135
                    },
                    {
                        headerName: '당월 집행율',
                        field: 'monthBudgetExecRate',
                        key: 'monthBudgetExecRate',
                        cellStyle: {textAlign: 'center'},
                        width: 120
                    }
                ]
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
                                '&MuiCard-root': {color: theme.palette.text.primary}
                            }}
                            secondary={
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Paper
                                            id="startDate"
                                            component="form"
                                            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 140}}
                                        >
                                            <InputBase
                                                sx={{ml: 1, flex: 1}}
                                                placeholder="회계연도"
                                                inputProps={{'aria-label': 'search google maps'}}
                                                value={year}
                                            />
                                            <IconButton type="button" sx={{p: '10px'}} aria-label="search"
                                                        onClick={onOpen}>
                                                <SearchIcon/>
                                            </IconButton>
                                            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                        </Paper>

                                        <SearchYearDialog open={openDialog} onClose={onClose} setYear={setYear}/>
                                        <YearDialog open={openDialog} onClose={onClose} setYear={setYear}/>

                                        <SearchYearDialog open={openDialog} onClose={onClose} setYear={setYear}/>
                                    </Grid>
                                    <Grid item>
                                        <Paper
                                            id="startDate"
                                            component="form"
                                            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 150}}
                                        >
                                            <InputBase
                                                sx={{ml: 1, flex: 1}}
                                                placeholder="사업장명"
                                                inputProps={{'aria-label': 'search google maps'}}
                                                value={workplace}
                                            />
                                            <IconButton type="button" sx={{p: '10px'}} aria-label="search"
                                                        onClick={onOpen2}>
                                                <SearchIcon/>
                                            </IconButton>
                                            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                        </Paper>
                                        <SearchDeptDialog open2={openDialog2} onClose2={onClose2}
                                                          setWorkplace={setWorkplace} setDname={setDname}/>
                                        <DeptDialog open2={openDialog2} onClose2={onClose2} setWorkplace={setWorkplace}
                                                    setDname={setDname}/>
                                        <SearchDeptDialog
                                            open2={openDialog2}
                                            onClose2={onClose2}
                                            setWorkplace={setWorkplace}
                                            setDname={setDname}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Paper
                                            id="startDate"
                                            component="form"
                                            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 100}}
                                        >
                                            <InputBase
                                                sx={{ml: 1, flex: 1}}
                                                placeholder="부서명"
                                                inputProps={{'aria-label': 'search google maps'}}
                                                value={dName}
                                            />
                                            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
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
                                    rows={budgetStatus}
                                    columnDefs={budgetStatusColumns}
                                    getRowId={(row) => row.accountInnerCode}
                                />
                                <AgGridReact rows={budgetStatus} columnDefs={budgetStatusColumns}
                                             getRowId={(row) => row.accountInnerCode}/>
                            </Box>
                        </MainCard>
                    </div>
                </Grid>
            </Grid>
        );
    };
};
export default BudgetStatus;