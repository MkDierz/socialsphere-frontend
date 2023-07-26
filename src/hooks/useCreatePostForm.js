// hooks/useCreatePostForm.js
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { usePostCreateMutation } from '../redux/api/postApi';

export default function useCreatePostForm(parentId) {
  const [createPost, { isError, error, isSuccess }] = usePostCreateMutation();
  const defaultValues = {
    content: '',
    tags: [],
  };
  const {
    handleSubmit, control, setValue, setError, reset,
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => {
    createPost({ ...data, ...(parentId && { parentId }) });
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

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return {
    handleSubmit, control, setValue, onSubmit,
  };
}
