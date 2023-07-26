import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Link } from '@mui/material';
import { Copyright, SignInAvatar, SignInForm } from '../components';
import useLoginForm from '../hooks/useLoginForm';

export default function Login() {
  const {
    handleSubmit, control, setValue, onSubmit,
  } = useLoginForm();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SignInAvatar />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          onSubmit={onSubmit}
        />
      </Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/register" variant="body2">
            Don&apos;t have an account? Sign up
          </Link>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
