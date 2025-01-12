import {useTranslation} from "react-i18next";

import { Box, Backdrop, Typography, CircularProgress } from '@mui/material';

import { useLoading } from 'src/contexts/loading-context';

export function LoadingScreen() {
    const { t } = useTranslation();
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <Backdrop
            open
            sx={{
                zIndex: 9999,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.5)',
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <CircularProgress color="primary" size={48} />
                <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>
                    {t('common:spinner.pleaseWait')}
                </Typography>
            </Box>
        </Backdrop>
    );
}