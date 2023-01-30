// material-ui
import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import { gridSpacing } from '../../../../../template/store/constant';
import MainCard from 'template/ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';

import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

import YearDialog from '../budgetformulation/YearDialog';
import DeptDialog from './DeptDialog';

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
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [Workplace, setWorkplace] = useState('');

    const theme = useTheme();
    const [year, setYear] = useState('');
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
            <Grid item xs={12}>
                <div align="center"></div>
                <MainCard
                    content={false}
                    title="연도,부서선택"
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
                                        placeholder="회계연도 2023"
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
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Google Maps"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onOpen2}>
                                        <SearchIcon />
                                    </IconButton>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </Paper>
                                <DeptDialog open2={openDialog2} onClose2={onClose2} setWorkplace={setWorkplace}/>
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
                    ></Box>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default BudgetRequest;
