import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const Results = (props) => {
    console.log(props)
  return (
    <Box sx={{display:"flex", flexDirection: "column", width: "auto"}}>
        <a>
        <Box sx={{backgroundColor: "#59D5E0", display: "flex", justifyContent: "space-between", paddingX: "5px"}}>
            <h2 style={{textAlign: "center",}}>{props.props.Type}</h2>
            <h2 style={{textAlign: "center"}}>{props.props.MatchName}</h2>
            <h2 style={{textAlign: "center"}}>{props.props.GroupStage}</h2>
        </Box>
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <Typography textAlign={"center"}>
                {props.props.Date}
            </Typography>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginX: "35px"}}>
                <Box>
                <img width="100px"alt="logo" src={props.props.ClgImg1}>
                </img>
                <Typography textAlign={"center"}>{props.props.ClgName1}</Typography>
                </Box>
                <Box>
                <Typography fontSize={"50px"}>{props.props.Score}</Typography>
                </Box>
                <Box>
                <img width="100px" alt="logo" src={props.props.ClgImg2}>
                </img>
                <Typography textAlign={"center"}>{props.props.ClgName2}</Typography>
                </Box>
            </Box>
        </Box>
        </a>
    </Box>
  )
}

export default Results