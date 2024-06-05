// material-ui
import { Grid } from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
// project imports
// import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import { gridSpacing } from 'store/constant';
// import MarkersPopups from 'ui-component/third-party/map/';
import JWTContext from 'contexts/JWTContext';
import { getAllUserCount } from 'services/userService';
import { getAllReportsToday } from 'services/userService';
// ==============================|| SAMPLE PAGE ||============================== //

const ReportPage = ({ isLoading }) => {
    const { isLoggedIn } = useContext(JWTContext);
    const [userCount, setUserCount] = useState(0);
    const [todayReportCount, setTodayReportCount] = useState(0);
   // Fetch users data on component mount
    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([getAllUserCount(), getAllReportsToday()])
                .then(([userCountData, todayReportCountData]) => {
                    setUserCount(userCountData);
                    setTodayReportCount(todayReportCountData);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }, [isLoggedIn]);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         // Fetch initial data
    //         Promise.all([getAllUserCount(), getAllReportsToday()])
    //             .then(([userCountData, todayReportCountData]) => {
    //                 setUserCount(userCountData);
    //                 setTodayReportCount(todayReportCountData);
    //             })
    //             .catch((error) => {
    //                 console.log(error.message);
    //             });

    //         // Establish WebSocket connection
    //         const socket = new WebSocket('ws://localhost:8080/api/v1/report');

    //         // Handle incoming WebSocket messages
    //         socket.onmessage = (event) => {
    //             const data = JSON.parse(event.data);
    //             if (data.count !== undefined) {
    //                 setTodayReportCount(data.count);
    //             }
    //         };

    //         // Clean up WebSocket connection on component unmount
    //         return () => {
    //             socket.close();
    //         };
    //     }
    // }, [isLoggedIn]);

    return (
        <>
            <MainCard title="Dashboard Page">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <EarningCard count={todayReportCount} details="Todays Report" icon={EarningIcon}></EarningCard>
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count={userCount} details="Total Users" icon={EarningIcon}></EarningCard>
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count="176" details="Active Users" icon={EarningIcon}></EarningCard>
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count="230" details="Average Daily Users" icon={EarningIcon}></EarningCard>
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={10}>
                        {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
                        <MainCard title="Markers & Popups">
 
                    </MainCard>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default ReportPage;