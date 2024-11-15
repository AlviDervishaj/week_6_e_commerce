import Stack from '@mui/material/Stack/Stack';
import styled from '@mui/material/styles/styled';

/**
 * Styled Stack MUI Component
 */
export const Item = styled(Stack)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));