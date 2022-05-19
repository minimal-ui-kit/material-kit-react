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

    const theme = useTheme();
    
    
    /*****************************************/
    /*   INFO ABOUT THE LINE FOR LATER USE   */
    /*****************************************/
    const isPlaceholderLine = () => {

        if (props.left){
            if (props.change.isInsert) return true
            return false
        }
        if (props.change.isDelete) return true
        return false

    }
    const isPlaceholder = isPlaceholderLine()
    const hasTextwrap = props.change.otherContent !== undefined;
    const hasHighlight = props.change.highlight !== undefined;
    
    
    /**********************************************/
    /*   STYLE DEFINITIONS THAT DEPEND ON THEME   */
    /**********************************************/
    const RowStyle = {}
    if (!props.change.isNormal && !isPlaceholder) {
        RowStyle.background = props.change.isInsert ? theme.palette.success.lighter : theme.palette.error.lighter
    }
    
    const highlightStyle = {background: theme.palette.warning.light}
    if (props.change.isInsert) highlightStyle.background = theme.palette.success.light
    if (props.change.isDelete) highlightStyle.background = theme.palette.error.light

    const lineNumStyle = {
        ...commonPreStyle,
        ...unselectable,
        color: theme.palette.grey[500],
        visibility: isPlaceholder ? "hidden" : "visible",
        textAlign: props.left ? "right" : "left",
    };
    
    
    /***************************/
    /*   LINE NUMBER WRAPPER   */
    /***************************/
    const wrapInLineNumber = (input) => {
        return (
            <tr style = {RowStyle} id={props.id}>
                {props.left || // line number on left if its the right side container
                    <td style={lineNumStyle}>
                       <pre> {props.change.isNormal ? props.change.newLineNumber : props.change.lineNumber} </pre>
                   </td>}
                {input}
                {props.left && // line number on right if its the left side container
                    <td style={lineNumStyle}>
                       <pre> {props.change.isNormal ? props.change.oldLineNumber : props.change.lineNumber} </pre>
                   </td>}
            </tr>)
    }
    
    
    /******************************/
    /*   BUILDER FOR EACH LAYER   */
    /******************************/
    const buildTextWrapLayer = () => {
        if (isPlaceholder) return
        if (!hasTextwrap) return
        return <pre style={backgroundTextStyle}>{props.change.otherContent}</pre>
    }
    
    const buildHighlightLayer = () => {
        if (isPlaceholder) return
        if (!hasHighlight) return
        
        // filter invalid values
        const preFiltered = props.change.highlight.filter((current) => {
            return (current.length === 2
                    && current[0]>=0
                    && current[0]<=props.change.content.length
                    && current[1]>=0
                    && current[1]<=props.change.content.length
                    && current[0]<current[1])
        });

        // sort highlights by start index
        preFiltered.sort((a, b) => {return a[0] - b[0]});
        
        // filter out overlapping highlights.
        // if they are overlapping only the one
        // that starts the earliest will be shown
        const filtered = preFiltered.filter((current, index, arr) => {
            return index>0 ? arr[index-1][1]<=current[0] : true
        });
        
        // fill the highlight into an array
        const retArray = []
        filtered.forEach((value, index, arr) => {
            if (index === 0) retArray.push(props.change.content.slice(0,value[0]))
            else retArray.push(props.change.content.slice(arr[index-1][1],value[0]))
            retArray.push(<span style={highlightStyle}>{props.change.content.slice(value[0],value[1])}</span>)
            if (index === filtered.length-1) retArray.push(props.change.content.slice(value[1]))
        })
        
        if (hasTextwrap) return <pre style={middleTextStyle}>{retArray}</pre> // there is a textwrap layer behind
        if (props.change.isNormal){ // only highlight the right side of normal lines
            return props.left || <pre style={{...backgroundTextStyle, visibility: "visible"}}>{retArray}</pre>
        }
        return <pre style={{...backgroundTextStyle, visibility: "visible"}}>{retArray}</pre> // there is no layer behind
    }

    const buildForeGroundLayer = () => {
        if (isPlaceholder) return <pre style={backgroundTextStyle}>{props.change.content}</pre>
        // TODO: fix this line level highlight situation some time
        const highlightedHtml = Prism.highlight(props.change.content, Prism.languages.python, 'python');
        if (hasTextwrap || hasHighlight) return <pre style={foregroundTextStyle} dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        return <pre style={commonPreStyle} dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    }


    /************************/
    /*   RETURN THE THING   */
    /************************/
    return wrapInLineNumber(
        <td style={tdStyle}>
            {buildTextWrapLayer()}
            {buildHighlightLayer()}
            {buildForeGroundLayer()}
        </td>)
}