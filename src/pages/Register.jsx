import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Link } from '@mui/material';
import { SignInAvatar, SignUpForm } from '../components';
import Copyright from '../components/Copyright';
import useSignUpForm from '../hooks/useSignUpForm';

export default function SignUp() {
  const {
    handleSubmit, control, setValue, onSubmit,
  } = useSignUpForm();

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
          Sign Up
        </Typography>
        <SignUpForm
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          onSubmit={onSubmit}
        />
      </Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/login" variant="body2">
            Already have an account? Log in
          </Link>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
