// components/ChipSelect.js
/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete, CircularProgress, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

function FormSelectMultiple({
  name, control, label, options, isLoading,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <Autocomplete
          id="tags"
          multiple
          fullWidth
          options={options || []}
          onChange={(event, newValue) => {
            onChange(newValue.map((item) => item.name));
          }}
          isOptionEqualToValue={(option, v) => option.name === v.name}
          value={options.filter((option) => value.includes(option.name)) || []}
          loading={isLoading}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}

FormSelectMultiple.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.shape({
    defaultValuesRef: PropTypes.shape({
      current: PropTypes.instanceOf(Object),
    }),
    formState: PropTypes.shape({
      errors: PropTypes.instanceOf(Object),
      isDirty: PropTypes.bool,
      isSubmitted: PropTypes.bool,
      touched: PropTypes.instanceOf(Object),
      isSubmitting: PropTypes.bool,
      dirtyFields: PropTypes.instanceOf(Object),
    }),
    setValue: PropTypes.func,
    register: PropTypes.func,
    unregister: PropTypes.func,
    clearErrors: PropTypes.func,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
    setError: PropTypes.func,
    trigger: PropTypes.func,
    removeFieldEventListener: PropTypes.func,
    mode: PropTypes.shape({
      isOnSubmit: PropTypes.bool,
      isOnChange: PropTypes.bool,
      isOnBlur: PropTypes.bool,
      isOnAll: PropTypes.bool,
    }),
    reValidateMode: PropTypes.shape({
      isReValidateOnBlur: PropTypes.bool,
      isReValidateOnChange: PropTypes.bool,
    }),
  }).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  isLoading: PropTypes.bool,
};

FormSelectMultiple.defaultProps = {
  isLoading: false,
  options: [],
};

export default FormSelectMultiple;
