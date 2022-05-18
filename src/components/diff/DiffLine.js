import { useState, useEffect } from 'react';
import { styled, useTheme} from '@mui/material/styles';
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

const tdStyle = {
    position: "relative",
    wordWrap: "anywhere"
}

const unselectable = {
    userSelect: "none",
    WebkitTouchTallout: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
};

const commonPreStyle = {
    whiteSpace: "pre-wrap",
    verticalAlign: "top",
};

// used so the cell height is the same as the cell height
// in the other column even when line wrapping
const backgroundTextStyle = {
    ...commonPreStyle,
    ...unselectable,
    visibility: "hidden",
    color: "transparent",
};

// used for the background highlighting
// REALLY UGLY SOLUTION HERE but well its just an MVP
const middleTextStyle = {
    ...commonPreStyle,
    ...unselectable,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    color: "transparent",
};

// actually contains and displays the text
const foregroundTextStyle = {
    ...commonPreStyle,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
};

export default function DiffLine(props) {

    // TODO: fix this line level highlight situation some time
    const language = Prism.highlight(props.change.content, Prism.languages.python, 'python');
    
    const isPlaceholderLine = () => {

        if (props.left){
            if (props.change.isInsert) return true
            return false
        }
        if (props.change.isDelete) return true
        return false

    }
    
    const theme = useTheme();
    const isPlaceholder = isPlaceholderLine()
    
    let RowStyle = {}
    if (!props.change.isNormal && !isPlaceholder) {
        RowStyle = {
            background: props.change.isInsert ? theme.palette.success.lighter : theme.palette.error.lighter
        }
    }
    
    const lineNumStyle = {
        ...commonPreStyle,
        ...unselectable,
        color: theme.palette.grey[500],
        visibility: isPlaceholder ? "hidden" : "visible",
        textAlign: props.left ? "right" : "left",
    };
    
    const highlightStyle = {background: theme.palette.warning.lighter} 
    if (props.change.isInsert) highlightStyle.background = theme.palette.success.light
    if (props.change.isDelete) highlightStyle.background = theme.palette.error.light

    
    const buildHighlightLayer = () => {
        if (!props.change.highlight) return
        
        console.log(props.change.highlight);
        
        // sort highlights by start index
        props.change.highlight.sort((a, b) => {return b[0] - a[0]});
        console.log(props.change.highlight);
        
        // filter out overlapping highlights.
        // if they are overlapping only the one
        // that starts the earliest will be shown
        // also filter invalid values
        const filtered = props.change.highlight.sort((current, index, arr) => {
            return (current.length === 2
                    && index>0 ? arr[index-1][1]<=current[1] : true)
                    && current[0]>=0
                    && current[0]<props.change.content.length
                    && current[1]>=0
                    && current[1]<props.change.content.length
                    && current[0]<current[1]
        });
        console.log(filtered);
        
        const retArray = []
        filtered.forEach((value, index, arr) => {
            if (index === 0) retArray.push(props.change.content.slice(0,value[0]))
            else retArray.push(props.change.content.slice(arr[index-1][1],value[0]))
            retArray.push(<span style={highlightStyle}>{props.change.content.slice(value[0],value[1])}</span>)
            if (index === filtered.length-1) retArray.push(props.change.content.slice(value[1]))
        })
        return retArray
    }

    return (
        <tr style = {RowStyle}>
            {props.left || // line number on left if its the right side container
                <td style={lineNumStyle}>
                   <pre> {props.change.isNormal ? props.change.newLineNumber : props.change.lineNumber} </pre>
               </td>}
            
            <td style={tdStyle}>
                {props.change.otherContent ? // has text wrap and possibly highlight
                    <>
                        <pre style={backgroundTextStyle}>{props.change.otherContent}</pre> {/* text wrap layer */}
                        {props.change.highlight && <pre style={middleTextStyle}>{buildHighlightLayer()}</pre>} {/* highlight layer */}
                        <pre style={foregroundTextStyle} dangerouslySetInnerHTML={{ __html: language }} /> {/* displayed text */}
                    </> : 
                    props.change.highlight ? // no text wrap but has highlight
                        <>
                            <pre style={{...backgroundTextStyle, visibility: "visible"}}>{buildHighlightLayer()}</pre> {/* highlight on text wrap */}
                            <pre style={foregroundTextStyle} dangerouslySetInnerHTML={{ __html: language }} /> {/* displayed text */}
                        </>: // no text wrap and no highlight
                            <pre style={isPlaceholder ? backgroundTextStyle : commonPreStyle} dangerouslySetInnerHTML={{ __html: language }} /> // normal displayed text
                    
                }
            </td>

            {props.left && // line number on right if its the left side container
                <td style={lineNumStyle}>
                   <pre> {props.change.isNormal ? props.change.oldLineNumber : props.change.lineNumber} </pre>
               </td>}
        </tr>
    )
}