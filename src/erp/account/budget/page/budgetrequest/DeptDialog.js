// material-ui
import { Box, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
//project imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import { gridSpacing } from '../../../../../template/store/constant';
import { dispatch } from 'template/store';

import * as types from '../../../base/reducer/BaseReducer';
import { workplace } from 'erp/logistic/base/saga/BasicInfoSaga';

// DEPARTMENT 테이블관련으로 만들 수 있을듯.

const WorkPlaceColumns = [
    { headerName: '사업장코드', field: 'workplaceCode' },
    { headerName: '사업장명', field: 'workplaceName'}
];

const DeptColumns = [
    { headerName: '부서코드', field: 'deptCode' },
    { headerName: '부서명', field: 'deptName' }
];

const DeptDialog = ({ open2, onClose2, setWorkplace }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const workplacedata = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.deptList);

    const uniqueWorkplace = _.uniqBy(workplacedata, "workplaceCode");

    useEffect(() => {
        dispatch({
            type: types.SEARCH_WORKPLACE_REQUEST
        });
    }, []);

    const onRowClicked2 = (e) => {
        console.log(uniqueWorkplace);
        console.log(e.row);
        setWorkplace(e.row);
    };

    return (
        <Dialog open={open2} fullWidth={true} maxWidth={'xs'}>
            <Grid container spacing={gridSpacing}>
                <Grid item sm={12}>
                    <MainCard content={false} title="사업장">
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
                                rows={uniqueWorkplace}
                                columns={WorkPlaceColumns}
                                getRowId={(row) => row.deptCode}
                                onRowClick={onRowClicked2}
                            />
                        </Box>
                    </MainCard>
                </Grid>
                <Grid item sm={12}>
                    <MainCard content={false} title="부서">
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
                            {/* <DataGrid
                                rows={workhere}
                                columns={DeptColumns}
                                getRowId={(row) => row.accountPeriodNo}
                                onRowClick={onRowClicked}
                            /> */}
                        </Box>
                    </MainCard>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default DeptDialog;
