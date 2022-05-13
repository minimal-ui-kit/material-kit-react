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

    // TODO: fix this line level highlight situation some time
    const language = Prism.highlight(props.change.content, Prism.languages.python, 'python');

    return (
        <tr>
            {props.left || <td><pre> {props.change.isNormal ? props.change.newLineNumber : props.change.lineNumber} </pre></td>}
            <td>
                <pre style={{ whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{ __html: language || " " }} />
            </td>
            {props.left && <td><pre> {props.change.isNormal ? props.change.oldLineNumber : props.change.lineNumber} </pre></td>}
        </tr>
    )

}