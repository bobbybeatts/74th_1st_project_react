// material-ui
import { Box, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';

// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import { gridSpacing } from '../../../../../template/store/constant';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YearDialog from 'erp/account/budget/page/budgetformulation/YearDialog';

import * as types from '../../../base/reducer/BaseReducer';

const accountColumns = [
    { headerName: '계정과목 코드', field: 'accountInnerCode', width: 120 },
    { headerName: '계정과목', field: 'accountName', width: 180 }
];

const accountDetailcolums = [
    { field: 'accountInnerCode', headerName: '계정과목코드', width: 120 },
    { field: 'accountName', headerName: '계정과목명', width: 250 }
];

// ==============================|| 계정과목관리 ||============================== //

const AccountDialog = ({ open, onClose, setAccountCode, setAccountName }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const accountData = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.accountCodeList);
    const accountDetailData = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.accountDetailList);

    useEffect(() => {
        dispatch({
            type: types.SEARCH_ACCOUNT_REQUEST
        });
    }, []);

    const onRowClicked = (e) => {
        console.log(e);
        dispatch({
            type: types.SEARCH_DETAIL_ACCOUNT_REQUEST,
            params: {
                code: e.row.accountInnerCode
            }
        });
    };

    const onSelectAccount = (e) => {
        //선택한 계정을 세팅
        setAccountCode(e.row.accountInnerCode);
        setAccountName(e.row.accountName);
    };
    const setAccountDetail = () => {
        onClose(false);
    };

    return (
        <Dialog open={open} fullWidth={true} maxWidth={'xl'}>
            <Grid container spacing={gridSpacing}>
                <Grid item sm={5}>
                    <MainCard content={false} title="계정">
                        {/* table data grid */}
                        <Box
                            sx={{
                                height: 500,
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
                                rows={accountData}
                                columns={accountColumns}
                                // pageSize={15}
                                // rowsPerPageOptions={[5]}
                                getRowId={(row) => row.accountName}
                                onRowClick={onRowClicked}
                            />
                        </Box>
                    </MainCard>
                </Grid>
                <Grid item sm={7}>
                    <MainCard
                        content={false}
                        title="계정과목"
                        secondary={
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button variant="contained" color="secondary" startIcon={<CheckIcon />} onClick={setAccountDetail}>
                                        선택
                                    </Button>
                                </Grid>
                                {/* <Grid item>
                                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                                    삭제
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" startIcon={<SaveIcon />}>
                                    저장
                                </Button> 
                            </Grid>*/}
                            </Grid>
                        }
                    >
                        {/* table data grid */}
                        <Box
                            sx={{
                                height: 500,
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
                                rows={accountDetailData}
                                columns={accountDetailcolums}
                                // pageSize={5}
                                // rowsPerPageOptions={[5]}
                                // checkboxSelection
                                getRowId={(row) => row.accountInnerCode}
                                onRowClick={onSelectAccount}
                            />
                        </Box>
                    </MainCard>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default AccountDialog;
