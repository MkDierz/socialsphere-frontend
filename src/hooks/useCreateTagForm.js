// hooks/useCreatePostForm.js
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useTagCreateMutation } from '../redux/api';

export default function useCreateTagForm() {
  const [createPost, { isError, error, isSuccess }] = useTagCreateMutation();
  const defaultValues = {
    name: '',
  };
  const {
    handleSubmit, control, setValue, setError,
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => {
    createPost(data);
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
    handleSubmit, control, setValue, onSubmit, isSuccess,
  };
}
