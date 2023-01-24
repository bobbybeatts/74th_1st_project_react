// material-ui
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// project imports
import MainCard from 'template/ui-component/cards/MainCard';
import TotalGrowthBarChart from 'template/ui-component/cards/Skeleton/TotalGrowthBarChart';

// ==============================|| SAMPLE PAGE ||============================== //



const BudgetRequest = () => {
    return (
        <Grid>
            <Grid item xs={12}>
                <div align="center">
                    <Typography variant="h3">[ 검색조건 ]</Typography>
                    <div>
                        <TextField
                            value={"Hi"}
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default BudgetRequest;