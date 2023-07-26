/* eslint-disable react/forbid-prop-types */
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import FormInputText from './FormInputText';

export default function SignInForm({
  handleSubmit, control, setValue, onSubmit,
}) {
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <FormInputText name="email" control={control} label="Email" rules={{ required: 'Email is required' }} type="email" setValue={setValue} />
      <FormInputText name="password" control={control} label="Password" rules={{ required: 'password is required' }} type="password" setValue={setValue} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit(onSubmit)}>
        Sign In
      </Button>
    </Box>
  );
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
