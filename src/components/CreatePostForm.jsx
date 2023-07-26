// components/CreatePostForm.js
import Button from '@mui/material/Button';
import {
  Box, IconButton, Stack, Tooltip, Typography,
} from '@mui/material';
import { Add, Cached } from '@mui/icons-material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import FormInputText from './FormInputText';
import useCreatePostForm from '../hooks/useCreatePostForm';
import FormSelectMultiple from './FormSelectMultiple';
import { useTagsQuery } from '../redux/api';
import CreateTagForm from './CreateTagForm';

export default function CreatePostForm({ parentId }) {
  const {
    handleSubmit, control, setValue, onSubmit,
  } = useCreatePostForm(parentId);
  const { data, refetch, isFetching } = useTagsQuery();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        { parentId && (
        <Typography variant="h5">
          Reply
        </Typography>
        )}
        <FormInputText name="content" control={control} label="Content" rules={{ required: 'Content is required' }} type="text" setValue={setValue} multiline />
        <Stack direction="row" spacing={1}>
          <FormSelectMultiple name="tags" label="Tags" options={data} setValue={setValue} control={control} isLoading={isFetching} />
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
          {parentId ? 'Reply' : 'Create Post'}
        </Button>
      </Box>
      <CreateTagForm state={open} changeState={setOpen} />
    </>
  );
}
CreatePostForm.propTypes = {
  parentId: PropTypes.number,
};
CreatePostForm.defaultProps = {
  parentId: null,
};
