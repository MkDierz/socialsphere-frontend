// components/CreatePostForm.js
import Button from '@mui/material/Button';
import { Box, Modal } from '@mui/material';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormInputText from './FormInputText';
import useCreateTagForm from '../hooks/useCreateTagForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateTagForm({ state, changeState }) {
  const {
    handleSubmit, control, setValue, onSubmit, isSuccess,
  } = useCreateTagForm();

  useEffect(() => {
    if (isSuccess) {
      changeState(false);
    }
  }, [changeState, isSuccess]);

  return (
    <Modal
      open={state}
      onClose={() => changeState(false)}
    >
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormInputText name="name" control={control} label="Tag Name" rules={{ required: 'Name is required' }} type="text" setValue={setValue} multiline />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create Tag
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
CreateTagForm.propTypes = {
  state: PropTypes.bool.isRequired,
  changeState: PropTypes.func.isRequired,
};
