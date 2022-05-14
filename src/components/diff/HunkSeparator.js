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
    
    const calcName = () => {
    
        if (props.left) {
            return props.hunkAfter ? `left-${props.hunkAfter.content}` : "left-end-anchor"
        }
        return props.hunkAfter ? `right-${props.hunkAfter.content}` : "right-end-anchor"
        
    }

    return [
    <Element name={calcName()}/>,
        <tr>
            <td colSpan={2}>
                <h5 style={{textAlign: "center"}}> {props.hunkAfter ? props.hunkAfter.content : "end separator"} </h5>
            </td>
        </tr>
    ]
    
}