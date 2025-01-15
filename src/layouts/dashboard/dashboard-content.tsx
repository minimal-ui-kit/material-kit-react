import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';

interface DashboardContentProps {
  children: React.ReactNode;
  maxWidth?: string | number | false;
}

export function DashboardContent({ children, maxWidth }: DashboardContentProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: { xs: 2, md: 3 },
        px: { xs: 2, md: 3 },
        ...(maxWidth && {
          maxWidth,
          mx: 'auto',
          width: '100%',
        }),
      }}
    >
      {children}
    </Box>
  );
} 