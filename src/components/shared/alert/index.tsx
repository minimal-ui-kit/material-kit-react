import { Alert, AlertProps, Box, IconButton, Portal, Slide } from '@mui/material';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Iconify, IconifyProps } from 'src/components/iconify';

export interface AppAlertProps {
  id?: string;
  label: string;
  icon?: IconifyProps['icon'];
  type: AlertProps['severity'];
}

export interface AppAlertMethods {
  show: (data: AppAlertProps, cb?: () => void) => void;
  close: (data: AppAlertProps, cb?: () => void) => void;
}

const AppAlert = forwardRef<AppAlertMethods>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const dataRef = useRef<AppAlertProps | null>(null);
  const container = useRef();

  const handleOpenClose = (open: boolean, data?: AppAlertProps | null) => {
    if (open) {
      dataRef.current = data ?? null;
      setVisible(true);
    } else {
      setVisible(false);
      dataRef.current = null;
    }
  };

  const clearData = () => {
    dataRef.current = null;
  };

  const onClose = () => {
    setVisible(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      show(data) {
        handleOpenClose(true, data);
      },
      close() {
        handleOpenClose(false);
      },
    }),
    []
  );

  return (
    <Portal>
      <Box sx={{ position: 'fixed', top: 20, right: 50, zIndex: 2000 }} ref={container}>
        <Slide in={visible} container={container.current}>
          <Alert
            severity={dataRef.current?.type}
            onClose={clearData}
            icon={dataRef.current?.icon && <Iconify icon={dataRef.current?.icon} />}
            action={
              <IconButton onClick={onClose}>
                <Iconify icon="ic:round-close" />
              </IconButton>
            }
          >
            {dataRef.current?.label}
          </Alert>
        </Slide>
      </Box>
    </Portal>
  );
});

export default AppAlert;
