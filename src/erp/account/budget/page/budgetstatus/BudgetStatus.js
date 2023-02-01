// material-ui
import { Box, Button, Grid, TextField, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from '../../../../../template/store/constant';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// project imports
import MainCard from 'template/ui-component/cards/MainCard';
import TotalGrowthBarChart from 'template/ui-component/cards/Skeleton/TotalGrowthBarChart';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ApprovalIcon from '@mui/icons-material/Approval';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect } from 'react';
import * as types from '../../reducer/BudgetReducer';

// ==============================|| SAMPLE PAGE ||============================== //

const BudgetStatus = () => {
    const budgetStatus = useSelector((state) => state.RootReducers.AccReducer.BudgetReducer.budgetList);

    const theme = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: types.SELECT_BUDGET_STATUS_REQUEST
        });
    }, []);
    //예산실적현황
    const budgetStatusColumns = [
        { headerName: '계정과목코드', field: 'accountInnerCode', key: 'accountInnerCode', width: 50 },
        { headerName: '계정과목', field: 'accountName', kye: 'accountName', width: 150 },
        { headerName: '누계 실적', field: 'ABR', key: 'ABR', width: 100 },
        { headerName: '누계 예산', field: 'annualBudget', key: 'annualBudget', width: 100 },
        { headerName: '누계 잔여예산', field: 'remainingBudget', key: 'remainingBudget', width: 100 },
        { headerName: '누계 집행율', field: 'budgetExecRate', key: 'budgetExecRate', width: 100 },
        { headerName: '당월 실적', field: 'AMBR', key: 'AMBR', width: 100 },
        { headerName: '당월 예산', field: 'Budget', key: 'Budget', width: 100 },
        { headerName: '당월 잔여예산', field: 'remainingMonthBudget', key: 'remainingMonthBudget', width: 100 },
        { headerName: '당월 집행율', field: 'monthBudgetExecRate', key: 'monthBudgetExecRate', width: 100 }
    ];

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <div align="center"></div>
                    <MainCard
                        content={false}
                        title=""
                        sx={{
                            '&MuiCard-root': { color: theme.palette.text.primary }
                        }}
                        secondary={
                            <Grid container spacing={1}>
                                <Grid item></Grid>
                            </Grid>
                        }
                    >
                        {/* table data grid */}
                        <Box
                            sx={{
                                height: 300,
                                width: '100%'
                            }}
                        >
                            <DataGrid
                                hideFooter
                                rows={budgetStatus}
                                columns={budgetStatusColumns}
                                getRowId={(row) => row.accountInnerCode}
                            />
                        </Box>
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
};

export default BudgetStatus;
