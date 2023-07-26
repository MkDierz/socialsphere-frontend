/* eslint-disable react/forbid-prop-types */
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export default function FormInputText({
  name, control, label, rules, type, multiline,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <TextField
          multiline={multiline}
          margin="normal"
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type={type}
          autoComplete="new-password"
        />
      )}
    />
  );
}

FormInputText.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  rules: PropTypes.object,
  type: PropTypes.string,
  multiline: PropTypes.bool,
};

FormInputText.defaultProps = {
  multiline: false,
  type: 'text',
  rules: {},
};
