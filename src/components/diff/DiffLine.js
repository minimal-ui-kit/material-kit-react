import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
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
import HunkSeparator from './HunkSeparator';

export default function DiffLine(props) {

    return (
        <tr>
            <td>
                {props.change.content}
            </td>
        </tr>
    )

}