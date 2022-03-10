import { Card, CardContent, Grid, Typography } from '@mui/material';
// --------------------------------------------
import CountUp from 'react-countup';
// import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'


export const AppNewUsers = (props) => {

  const [despiuteCount, setDisputeCount] = useState(0)
  const [highestBid, setHighestBid] = useState(0)
  // const wallet = useSelector(state => state.wallet)
  // const myLeads = useSelector(state => state.myLeads)
  // const userSubscriptions = useSelector(state => state.userSubscriptions)
  // useEffect(() => {
  //   console.log(myLeads)
  //   let disputeCount = 0
  //   myLeads.map(lead => {
  //     if (lead.status === 'dispute') disputeCount++
  //   })
  //   setDisputeCount(disputeCount)
  // }, [])
  // // const classes = makeStyles();
  // // higestBid
  // useEffect(() => {
  //   let highestBidCount = 0
  //   userSubscriptions.map(sub => {
  //     if (sub.topBidAmount <= sub.currentBitAmount) highestBidCount++
  //   })
  //   setHighestBid(highestBidCount)
  // }, [])
  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              // color="textSecondary"
              color="secondary"
              gutterBottom
              variant="overline"
            >
           Total Recipt
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
               <CountUp start={0} 
              //  end={myLeads.length} 
               duration={2} separator="," />
            </Typography>
          </Grid>
          {/* <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  )
};

export default AppNewUsers;