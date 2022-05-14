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
import DiffLine from './DiffLine';

export default function DiffFile(props) {

    const StyledCard = styled(Card)(({ theme }) => ({
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    }));
    
    const renderChanges = (hunk) => {
        return hunk.changes.map((change) => {
            if (props.left && (change.isNormal || change.isDelete)){
                return <DiffLine change={change} left={props.left}/>
            }
            if (!props.left && (change.isNormal || change.isInsert)){
                return <DiffLine change={change} left={props.left}/>
            }
            
            return null
            
        })
    }
    
    const renderHunks = () => {
        if (props.file.hunks.length <= 0) {
            return
        }
        return [
            props.file.hunks.map((hunk, index, hunks) => {
                return[
                        <HunkSeparator
                            hunkBefore={index === 0 ? null : hunks[index-1]}
                            hunkAfter={hunk}
                            left = {props.left}
                        />,
                        renderChanges(hunk)
                ]
            }),
            <HunkSeparator
                hunkBefore={props.file.hunks[props.file.hunks.length-1]}
                hunkAfter={null}
            />
        ]
    
    }

    return (
        <StyledCard>
            <table>
                <thead>
                <tr>
                <td colSpan = {2}>
                    <h4 style={{textAlign: "center"}}>
                       [{props.left ? props.file.oldRevision : props.file.newRevision}] {props.left ? props.file.oldPath : props.file.newPath}
                    </h4>
                </td>
                </tr></thead>
                <tbody>
                {renderHunks()}
                </tbody>
            </table>
        </StyledCard>
    )

}