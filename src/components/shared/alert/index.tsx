import { Alert, AlertProps, Box, IconButton, Portal, Slide } from '@mui/material';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Iconify, IconifyProps } from 'src/components/iconify';

export interface AppAlertProps {
  id?: string;
  label: string;
  icon?: IconifyProps['icon'];
  type: AlertProps['severity'];
  duration?: number;
}

export interface AppAlertMethods {
  show: (data: AppAlertProps, cb?: () => void) => void;
  close: (data: AppAlertProps, cb?: () => void) => void;
}

const AppAlert = forwardRef<AppAlertMethods>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(visible);
  const dataRef = useRef<AppAlertProps | null>(null);
  const [value, setValue] = useState<AppAlertProps | null>(null);

  const container = useRef();

  const clearData = () => {
    setValue(null);
  };

  const handleOpenClose = useCallback((open: boolean, data?: AppAlertProps | null) => {
    if (open) {
      setValue(data ?? null);
      setVisible(open);
      setShow(open);
      setTimeout(
        () => {
          setVisible(false);
        },
        (data?.duration ?? 5) * 1000
      );
    } else {
      setVisible(open);
      clearData();
    }
  }, []);

  const onClose = () => {
    setVisible(false);
  };

  const onExited = () => {
    setShow(false);
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
    [handleOpenClose]
  );

  return show ? (
    <Portal>
      <Box sx={{ position: 'fixed', top: 20, right: 50, zIndex: 2000 }} ref={container}>
        <Slide
          in={visible}
          onExited={onExited}
          className="helloWorld"
          container={container.current}
        >
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
            {value?.label}
          </Alert>
        </Slide>
      </Box>
    </Portal>
  ) : null;
});

export default AppAlert;
