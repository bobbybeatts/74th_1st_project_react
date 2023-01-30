import { useState } from 'react';
// material-ui
import { Box, Button, Grid, TextField, Typography, InputLabel, Paper, Dialog } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { gridSpacing } from '../../../../../template/store/constant';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// project imports
import MainCard from 'template/ui-component/cards/MainCard';
import YearDialog from './YearDialog';


// ==============================|| SAMPLE PAGE ||============================== //

const BudgetStatus = () => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const [year, setYear] = useState('');
    const selectYear = () => {
        setOpenDialog(true);
    };
    const onClose = () => {
        setOpenDialog(false);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <Paper id="fisicalYear" component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                            <InputLabel sx={{ p: '10px' }}>회계연도</InputLabel>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Fisical Year"
                                inputProps={{ 'aria-label': 'Fisical Year' }}
                                value={year}
                            />

                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={selectYear}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <YearDialog open={openDialog} onClose={onClose} setYear={setYear} />
                    </Grid>
                    <Grid item xs={4}>
                        <Paper id="startDate" component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                            <InputLabel sx={{ p: '10px' }}>사업장</InputLabel>
                            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Work Place" inputProps={{ 'aria-label': 'Work Place' }} />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper id="startDate" component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                            <InputLabel sx={{ p: '10px' }}>부서</InputLabel>
                            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Dept" inputProps={{ 'aria-label': 'Dept' }} />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
                <MainCard content={false} title="계정과목"></MainCard>
            </Grid>
        </Grid>
    );
};

export default BudgetStatus;
