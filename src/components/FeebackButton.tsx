import Button, { ButtonProps } from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useCallback, useState } from 'react';
import Alert from '@mui/material/Alert/Alert';

type FeedbackProps = {
  errorText: string;
  text: string;
  buttonText: string;
  buttonProps?: ButtonProps;
  handleOnClick?: () => boolean;
}

export const FeedbackButton = ({ errorText, text, buttonText, buttonProps, handleOnClick }: FeedbackProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (handleOnClick){ 
      const _result: boolean = handleOnClick();
      setIsError(!_result)
    };
    setIsOpened(true);
  }, [handleOnClick]);

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpened(false);
  };

  return (
    <div>
      <Button {...buttonProps} onClick={handleClick}>{buttonText}</Button>
      <Snackbar
        open={isOpened}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={isError ? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isError ? errorText : text}
        </Alert>
      </Snackbar>
    </div>
  );
}

