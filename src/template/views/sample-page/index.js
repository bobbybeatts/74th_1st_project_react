// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'template/ui-component/cards/MainCard';
import TotalGrowthBarChart from "../../../util/TotalGrowthBarChart";

// ==============================|| SAMPLE PAGE ||============================== //



const SamplePage = () => (
    <MainCard title="74th React Project">
        <Typography variant="body2">
            74기 리액트 프로젝트
        <TotalGrowthBarChart />
        </Typography>
    </MainCard>
);

export default SamplePage;
