// material-ui
import { Box, Button, Grid, TextField, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from '../../../../../template/store/constant';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// project imports
import MainCard from 'template/ui-component/cards/MainCard';
import TotalGrowthBarChart from 'template/ui-component/cards/Skeleton/TotalGrowthBarChart';

// ==============================|| SAMPLE PAGE ||============================== //

const BudgetStatus = () => {
    const theme = useTheme();
    const selectYear = () => {
        console.log(1);
    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    title=""
                    sx={{
                        '&MuiCard-root': { color: theme.palette.text.primary }
                    }}
                    secondary={
                        <Grid container spacing={4}>
                            <Grid item>
                                <Paper id="selectYear" variant="contained" onClick={selectYear}></Paper>
                            </Grid>
                        </Grid>
                    }
                ></MainCard>
            </Grid>
        </Grid>
    );
};

export default BudgetStatus;
