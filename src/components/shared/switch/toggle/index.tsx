import { Box, Switch, SwitchProps, Typography } from '@mui/material'
import { FC } from 'react'

export interface ToggleSwitchProps extends SwitchProps {
    label:string
}

const ToggleSwitch:FC<ToggleSwitchProps> = ({label, checked, ...props}) => (
    <Box sx={{display:'flex', alignItems:'center'}}>
        <Typography variant='caption' fontWeight={700}>
            {label}
        </Typography>
        <Switch checked={checked} {...props} />
    </Box>
)

export default ToggleSwitch