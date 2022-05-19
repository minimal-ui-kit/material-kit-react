import { useState, useEffect } from 'react';
import { styled, useTheme} from '@mui/material/styles';
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
    
    const theme = useTheme()

    return (
        <tr id={props.id} style={{background: theme.palette.background.neutral, color: theme.palette.text.disabled}}>
            <td colSpan={2} style={{textAlign: "center"}}>
                {props.hunkAfter ? props.hunkAfter.content : "end separator"}
            </td>
        </tr>)
    
}