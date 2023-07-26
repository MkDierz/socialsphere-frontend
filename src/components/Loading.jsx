import { Backdrop, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Backdrop
      sx={{
        color: 'primary',
        position: 'absolute',
        top: 0,
      }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
