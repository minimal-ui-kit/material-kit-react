import type { FC } from 'react'
import type { SwitchProps} from '@mui/material';

import { Box, Switch, Typography } from '@mui/material'

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