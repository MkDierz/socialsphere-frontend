import { Controller } from 'react-hook-form';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function FormSelect({
  name, control, label, rules, options,
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
        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            error={!!error}
            helperText={error ? error.message : null}
            onChange={onChange}
            value={value}
          >
            {options.map((option) => (
              <MenuItem key={JSON.stringify(option)} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  rules: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

FormSelect.defaultProps = {
  rules: {},
};
