import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Element } from 'react-scroll'
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

export default function HunkSeparator(props) {

    return (
        <tr>
            <td>
                <Element name={props.hunkAfter ? props.hunkAfter.content : "end-anchor"}/>
                <h5 style={{textAlign: "center"}}> {props.hunkAfter ? props.hunkAfter.content : "end separator"} </h5>
            </td>
        </tr>
    )
    
}
