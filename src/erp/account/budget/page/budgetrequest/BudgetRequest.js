// material-ui
import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import { gridSpacing } from '../../../../../template/store/constant';
import MainCard from 'template/ui-component/cards/MainCard';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// project imports

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
    const [open, setOpen] = useState(false);
    const budgetListData = () => {};
    const theme = useTheme();
    const [year, setYear] = useState('2020');

    const [openY, setOpenY] = useState(false);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <div align="center">
                    <div>
                        <Button onClick={budgetListData} variant="contained" color="secondary">
                            회계 연도 조회
                        </Button>
                        <Modal open={open}>
                            <div
                                align="center"
                                className="ag-theme-balham"
                                style={{
                                    width: '50%',
                                    height: 500,
                                    background: 'white'
                                }}
                            ></div>
                        </Modal>
                    </div>
                </div>
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
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Google Maps"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper
                                    id="startDate"
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Google Maps"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper
                                    id="startDate"
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Google Maps"
                                        inputProps={{ 'aria-label': 'search google maps' }}
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
                        {/* <DataGrid
                            rows={slipData}
                            columns={slipColumns}
                            // checkboxSelection
                            hideFooter
                            getRowId={(row) => row.slipNo}
                            onRowClick={searchJour}
                        /> */}
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default BudgetRequest;
