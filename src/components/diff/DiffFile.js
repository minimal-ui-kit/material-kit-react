import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
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
    
        let retChanges = [];
        let state = "normal";
        let deletes = [];
        let inserts = [];
        
        const finalizeBlock = () => {
        
            const ndels = deletes.length
            const nins = inserts.length
        
            if (props.left){
                deletes.forEach((change, index) => {
                    if (index<nins && inserts[index].content.length > change.content.length ) { change.otherContent = inserts[index].content }
                    retChanges.push(change)
                })
                if (nins > ndels) {
                    retChanges = retChanges.concat(inserts.slice(ndels-nins))
                }
            } else {
                inserts.forEach((change, index) => {
                    if (index<ndels && deletes[index].content.length > change.content.length ) { change.otherContent = deletes[index].content }
                    retChanges.push(change)
                })
                if (ndels > nins) {
                    retChanges = retChanges.concat(deletes.slice(nins-ndels))
                }
            }
            deletes = []
            inserts = []
        };
        
        const stateTransitions = {
            "normal":{
                isNormal:{
                    action: (change) => retChanges.push(change),
                    newState:"normal"
                },
                isInsert:{
                    action: (change) => inserts.push(change),
                    newState:"start-with-insert"
                },
                isDelete:{
                    action: (change) => deletes.push(change),
                    newState:"start-with-delete"
                }
            },
            "start-with-insert":{
                isNormal:{
                    action: (change) => {finalizeBlock();retChanges.push(change);},
                    newState:"normal"
                },
                isInsert:{
                    action: (change) => inserts.push(change),
                    newState:"start-with-insert"
                },
                isDelete:{
                    action: (change) => deletes.push(change),
                    newState:"end-with-delete"
                }
            },
            "start-with-delete":{
                isNormal:{
                    action: (change) => {finalizeBlock();retChanges.push(change);},
                    newState:"normal"
                },
                isInsert:{
                    action: (change) => inserts.push(change),
                    newState:"end-with-insert"
                },
                isDelete:{
                    action: (change) => deletes.push(change),
                    newState:"start-with-delete"
                }
            },
            "end-with-insert":{
                isNormal:{
                    action: (change) => {finalizeBlock();retChanges.push(change);},
                    newState:"normal"
                },
                isInsert:{
                    action: (change) => inserts.push(change),
                    newState:"end-with-insert"
                },
                isDelete:{
                    action: (change) => {finalizeBlock();deletes.push(change);},
                    newState:"start-with-delete"
                }
            },
            "end-with-delete":{
                isNormal:{
                    action: (change) => {finalizeBlock();retChanges.push(change);},
                    newState:"normal"
                },
                isInsert:{
                    action: (change) => {finalizeBlock();inserts.push(change);},
                    newState:"start-with-insert"
                },
                isDelete:{
                    action: (change) => deletes.push(change),
                    newState:"end-with-delete"
                }
            }
        }
        
        hunk.changes.forEach((change) => {
            const transitions = stateTransitions[state]
            if (change.isNormal) {
                transitions.isNormal.action(change);
                state = transitions.isNormal.newState;
            }
            if (change.isInsert) {
                transitions.isInsert.action(change);
                state = transitions.isInsert.newState;
            }
            if (change.isDelete) {
                transitions.isDelete.action(change);
                state = transitions.isDelete.newState;
            }
        })
        finalizeBlock()
        
        return retChanges.map((change) => <DiffLine change={change} left={props.left}/>)
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
        <StyledCard sx={{ boxShadow: 3 }}>
            <CardHeader 
                style={{textAlign: "center"}} 
                title={props.left ? props.file.oldPath : props.file.newPath}
                subheader={props.left ? props.file.oldRevision : props.file.newRevision}/>
            <table cellSpacing={0} style={{width: '100%'}}>
                <tbody>
                    {renderHunks()}
                </tbody>
            </table>
        </StyledCard>
    )

}