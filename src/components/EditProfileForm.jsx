// components/CreatePostForm.js
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useState } from 'react';
import FormInputText from './FormInputText';
import CreateTagForm from './CreateTagForm';
import useEditProfileForm from '../hooks/useEditProfileForm';
import FormSelect from './FormSelect';

export default function EditProfileForm() {
  const {
    handleSubmit, control, onSubmit,
  } = useEditProfileForm();
  const [open, setOpen] = useState(false);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormInputText
        name="name"
        control={control}
        label="Full Name"
        type="text"
      />
      <FormInputText
        name="username"
        control={control}
        label="username"
        type="text"
      />
      <FormInputText
        name="email"
        control={control}
        label="User Email"
        type="email"
      />
      <FormInputText
        name="password"
        control={control}
        label="User Password"
        type="password"
      />
      <FormInputText
        name="bio"
        control={control}
        label="Bio"
        type="text"
        multiline
      />
      <FormInputText
        name="location"
        control={control}
        label="Location"
        type="text"
      />
      <FormSelect
        name="compress"
        control={control}
        label="Compression Method"
        options={[
          { value: 'none', label: 'none' },
          { value: 'full', label: 'full' },
          { value: 'gzip', label: 'gzip' },
          { value: 'hpack', label: 'hpack' },
        ]}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update Profile
      </Button>
      <CreateTagForm state={open} changeState={setOpen} />
    </Box>
  );
}
