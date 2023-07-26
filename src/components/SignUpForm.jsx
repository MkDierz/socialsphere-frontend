/* eslint-disable react/forbid-prop-types */
// components/SignUpForm.js
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import FormInputText from './FormInputText';

export default function SignUpForm({
  handleSubmit, control, setValue, onSubmit,
}) {
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <FormInputText name="username" control={control} label="Username" rules={{ required: 'Username is required' }} type="text" setValue={setValue} />
      <FormInputText name="email" control={control} label="Email" rules={{ required: 'Email is required' }} type="email" setValue={setValue} />
      <FormInputText name="password" control={control} label="Password" rules={{ required: 'Password is required' }} type="password" setValue={setValue} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit(onSubmit)}>
        Sign Up
      </Button>
    </Box>
  );
}
SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
