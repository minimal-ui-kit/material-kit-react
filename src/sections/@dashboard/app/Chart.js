import React from 'react';
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material';
import { Card, CardHeader, Typography } from '@mui/material';
import CountUp from "react-countup";
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#9279ee',
                '#d44350',
                '#f5af52',
            ],
            borderColor: [
                '#9279ee',
                '#d44350',
                '#f5af52',
            ],
            borderWidth: 1,
        },
    ],
};





const Adminchart = ({today,yesterday,month}) => {
      
    return (


        <Card style={{ paddingTop: "5%", paddingLeft:"10%", paddingBottom: "25%" }} >
            <Typography paddingTop={2} paddingBottom={5}  variant="h4" color="secondary">Most Order Items</Typography>
            {/* {  data ?  <Doughnut data={data} /> : <CircularProgress />} */}
            
            <box>
                <Typography variant="h4" >
                    <CountUp start={0}
                    // end={today}
                     duration={2.5} separator="," />
                </Typography>
                <Typography marginBottom={5} variant="h6" >
                    Total Leads in Today
                </Typography>
            </box>
            <box>
                <Typography variant="h4" >
                    <CountUp start={0}
                    //  end={yesterday} 
                    duration={2.5} separator="," />
                </Typography>
                <Typography marginBottom={5} variant="h6" >
                    Total Leads in Yesterday
                </Typography>
            </box>
            <box>
                <Typography variant="h4" >
                    <CountUp start={0} 
                    // end={month} 
                    duration={2.5} separator="," />
                </Typography>
                <Typography variant="h6" >
                    Total Leads in Month
                </Typography>
            </box>
         
        </Card>


    )
}

export default Adminchart;



