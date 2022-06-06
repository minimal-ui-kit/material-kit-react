import { useTheme} from '@mui/material/styles';

export default function HunkSeparator(props) {
    
    const theme = useTheme()
    
    let text = ""
    if (props.hunkAfter) {
        text = props.hunkAfter.header || props.hunkAfter.content
    } else {
        text = "end separator";
    }

    return (
        <tr id={props.id} style={{background: theme.palette.background.neutral, color: theme.palette.text.disabled}}>
            <td colSpan={2} style={{textAlign: "center"}}>
                {text}
            </td>
        </tr>)
    
}