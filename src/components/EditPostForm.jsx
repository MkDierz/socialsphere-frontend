// components/CreatePostForm.js
import Button from '@mui/material/Button';
import {
  Box, IconButton, Modal, Stack, Tooltip,
} from '@mui/material';
import { Add, Cached } from '@mui/icons-material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import FormInputText from './FormInputText';
import FormSelectMultiple from './FormSelectMultiple';
import { useTagsQuery } from '../redux/api';
import CreateTagForm from './CreateTagForm';
import useEditPostForm from '../hooks/useEditPostForm';

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

export default function EditPostForm({ id, state, changeState }) {
  const {
    handleSubmit, control, setValue, onSubmit,
  } = useEditPostForm(id, state);
  const [open, setOpen] = useState(false);
  const {
    data: tags, isLoading, refetch,
  } = useTagsQuery();
  return (
    <Modal
      open={state}
      onClose={() => changeState(false)}
    >
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInputText name="content" control={control} label="Content" rules={{ required: 'Content is required' }} type="text" multiline />
        <Stack direction="row" spacing={1}>
          <FormSelectMultiple name="tags" label="Tags" options={tags} setValue={setValue} control={control} isLoading={isLoading} />
          <Tooltip title="Refetch tag">
            <IconButton aria-label="add" size="small" onClick={() => refetch()}>
              <Cached fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create new tag">
            <IconButton color="primary" aria-label="add" size="small" onClick={() => setOpen(true)}>
              <Add fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update Post
        </Button>
        <CreateTagForm state={open} changeState={setOpen} />
      </Box>
    </Modal>
  );
}
EditPostForm.propTypes = {
  id: PropTypes.number.isRequired,
  state: PropTypes.bool.isRequired,
  changeState: PropTypes.func.isRequired,
};
