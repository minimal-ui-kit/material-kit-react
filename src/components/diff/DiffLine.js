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
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import HunkSeparator from './HunkSeparator';

export default function DiffLine(props) {

    const language = Prism.highlight(props.change.content, Prism.languages.python, 'python');

    return (
        <tr>
            <td style={{whiteSpace: 'pre-wrap'}}>
                <span dangerouslySetInnerHTML={{ __html: language }} />
            </td>
        </tr>
    )

}