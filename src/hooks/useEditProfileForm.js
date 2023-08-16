// hooks/useCreatePostForm.js
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useProfileQuery, useProfileUpdateMutation } from '../redux/api';

export default function useEditProfileForm() {
  const {
    data: dataFetched, isFetching, isSuccess: isFetchSuccess, isError: isFetchError,
  } = useProfileQuery();
  const [updateProfile, { isError, error }] = useProfileUpdateMutation();

  const {
    handleSubmit, control, setError, reset,
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      bio: '',
      location: '',
      password: '',
      compress: 'none',
    },
  });

  useEffect(() => {
    if (isFetchSuccess) {
      const {
        email, name, username, Profile, Config,
      } = dataFetched;
      const { bio, location } = Profile;
      const { compress } = Config;
      reset({
        email, name, username, bio, location, compress,
      });
    }
  }, [dataFetched, isFetchSuccess, reset]);

  const onSubmit = ({
    name, username, email, bio, location, password, compress,
  }) => {
    updateProfile({
      name, username, email, bio, location, password, compress,
    });
    // console.log(name, username, email, bio, location, password);
  };

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error.data.message)) {
        error.data.message.forEach((e) => {
          setError(e.field, {
            type: 'server',
            message: e.message,
          });
        });
      }
    }
  }, [isError, error, setError]);

  return {
    handleSubmit, control, onSubmit, isFetching, isFetchSuccess, isFetchError,
  };
}
