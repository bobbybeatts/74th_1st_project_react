// material-ui
import { Box, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
//project imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import { gridSpacing } from '../../../../../template/store/constant';

import * as types from '../../../base/reducer/BaseReducer';
import { dispatch } from 'template/store';

const YearColumns = [
    { headerName: '시작날짜', field: 'periodStartDate' },
    { headerName: '끝난날짜', field: 'periodEndDate' }
];

const YearDialog = ({ open, onClose, setYear }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const yearData = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.periodNoList);

    useEffect(() => {
        dispatch({
            type: types.SEARCH_PERIOD_NO_REQUEST
        });
    }, []);

    const onRowClicked = (e) => {
        console.log(e);
        setYear(e.row.fiscalYear);
        onClose(false);
    };
    return (
        <Dialog open={open} fullWidth={true} maxWidth={'sm'}>
            <Grid container spacing={gridSpacing}>
                <Grid item sm={12}>
                    <MainCard content={false} title="년도">
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
                                rows={yearData}
                                columns={YearColumns}
                                getRowId={(row) => row.accountPeriodNo}
                                onRowClick={onRowClicked}
                            />
                        </Box>
                    </MainCard>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default YearDialog;
