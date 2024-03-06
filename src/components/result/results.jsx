import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const Results = (props) => {
    console.log(props)
    const pointTo='./products/editresults/'+props.props.Type+'/'+props.props._id;
    
    console.log(role)
if(role==="head" || role==="executive"){
  return (
    
    <Box sx={{display:"flex", flexDirection: "column", width: "auto"}}>
        <a href={pointTo}>
        <Box sx={{backgroundColor: "#59D5E0", display: "flex", justifyContent: "space-between", paddingX: "5px"}}>
            <h2 style={{textAlign: "center",}}>{props.props.Type}</h2>
            <h2 style={{textAlign: "center"}}>{props.props.MatchName}</h2>
            <h2 style={{textAlign: "center"}}>{props.props.GroupStage}</h2>
        </Box>
        <Box sx={{display:"flex", flexDirection:"column", } }>
            <Typography fontSize={"20px"} textAlign={"center"} mb={3}>
                {props.props.Date}
            </Typography>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginX: "15px"}}>
                <Box>
                <img width="100px"alt="logo" src={props.props.ClgImg1}>
                </img>
                <Typography textAlign={"center"}>{props.props.ClgName1}</Typography>
                </Box>
                
                {props.props.Type==="football" && <Box><Typography fontSize={"50px"}>{props.props.Score}</Typography></Box>}
                {props.props.Type==="cricket" && 
                
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Box>
                        <Typography fontSize={"40px"} mr={4}>{props.props.Score1}</Typography>
                        <Typography textAlign={"center"} fontSize={"25px"} mr={4}>{props.props.Over1}</Typography>
                        </Box>
                        <Box>
                        <Typography fontSize={"40px"}>{props.props.Score2}</Typography> <Typography textAlign={"center"} fontSize={"25px"} mr={4}>{props.props.Over2}</Typography></Box>
                    </Box>
              
                
                }
                {props.props.Type==="athlete" && 
                <Box>
                    <Typography fontSize={"25px"} mr={4}>1 - {props.props.Player1}</Typography>
                    <Typography fontSize={"25px"} mr={4}>2 - {props.props.Player2}</Typography>
                    <Typography fontSize={"25px"} mr={4}>3 - {props.props.Player3}</Typography>
                </Box>
                }
                
                <Box>
                <img width="100px" alt="logo" src={props.props.ClgImg2}>
                </img>
                <Typography textAlign={"center"}>{props.props.ClgName2}</Typography>
                </Box>
            </Box>
        </Box>
        </a>
    </Box>
  )}
  else{
    return(
        <h1>NOT AUTHORISED</h1>
    )
  }
  
}

export default Results