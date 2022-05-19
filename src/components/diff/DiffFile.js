import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
import { hashHunkSeparator, hashLine, invertHex } from '../../utils/diffRefs'

export default function DiffFile(props) {

    const filePath = props.left ? props.file.oldPath : props.file.newPath
    const fileRevision = props.left ? props.file.oldRevision : props.file.newRevision

    const StyledCard = styled(Card)(({ theme }) => ({
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    }));
    
    const calcChangeId = (change) => {
        // For normal lines, we use the file data of the right side. The id of the left side is calculated by HEX inverting
        if (change.isNormal) {
            const ret = hashLine(false, props.file.newPath, props.file.newRevision, change.newLineNumber)
            if (props.left) return invertHex(ret)
            return ret
        }
        
        // For delete lines we always use the left file details. These lines are either placeholders or not
        // If they are placeholders, the right side ID will be calculated from the left side one by HEX invert
        if (change.isDelete) {
            const ret = hashLine(true, props.file.oldPath, props.file.oldRevision, change.lineNumber)
            if (!props.left) return invertHex(ret)
            return ret
        }
        
        // Similarly for insert lines we always use the right file details. These lines are either placeholders or not
        // If they are placeholders, the left side ID will be calculated from the right side one by HEX invert
        if (change.isInsert) {
            const ret = hashLine(false, props.file.newPath, props.file.newRevision, change.lineNumber)
            if (props.left) return invertHex(ret)
            return ret
        }
        
        return null
    }
    
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
        
        return retChanges.map((change) => {
            const id = calcChangeId(change)
            return <DiffLine change={change} left={props.left} key={id} id={id}/>
        })
    }
    
    const renderHunks = () => {
        if (props.file.hunks.length <= 0) {
            return
        }
        const endHunkId = hashHunkSeparator(props.left, filePath, fileRevision, "end hunk")
        return [
            props.file.hunks.map((hunk, index, hunks) => {
            const id = hashHunkSeparator(props.left, filePath, fileRevision, hunk.content)
                return[
                        <HunkSeparator
                            hunkBefore={index === 0 ? null : hunks[index-1]}
                            hunkAfter={hunk}
                            left = {props.left}
                            key = {id}
                            id = {id}
                        />,
                        renderChanges(hunk)
                ]
            }),
            <HunkSeparator
                hunkBefore={props.file.hunks[props.file.hunks.length-1]}
                hunkAfter={null}
                key = {endHunkId}
                id = {endHunkId}
            />
        ]
    
    }

    const theme = useTheme()

    const fileHeaderStyle = {
        textAlign: "center",
        background: theme.palette.secondary.lighter,
        padding: theme.spacing(1)
    }
        

    return (
        <StyledCard sx={{ boxShadow: 4 }} id={props.id}>
            <CardHeader 
                style={fileHeaderStyle} 
                title={filePath}
                subheader={fileRevision}/>
            <table cellSpacing={0} style={{width: '100%'}}>
                <tbody>
                    {renderHunks()}
                </tbody>
            </table>
        </StyledCard>
    )

}