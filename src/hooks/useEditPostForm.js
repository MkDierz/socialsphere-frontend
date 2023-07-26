// hooks/useCreatePostForm.js
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { usePostByIdQuery, usePostUpdateMutation } from '../redux/api/postApi';

export default function useEditPostForm(id, state) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (id && state) {
      setReady(true);
    }
  }, [id, state]);

  const {
    isError: isErrorFetch,
    isFetching,
    data: dataFetched,
    isSuccess: isFetchSuccess,
  } = usePostByIdQuery(id, { skip: !ready });

  const [editPost, { isError, error }] = usePostUpdateMutation();

  const {
    handleSubmit, control, setValue, setError, reset,
  } = useForm({
    defaultValues: {
      content: '',
      tags: '',
    },
  });

  useEffect(() => {
    if (isFetchSuccess) {
      const { tags, content } = dataFetched;
      reset({
        content,
        tags: tags.map((t) => t.name),
      });
    }
  }, [dataFetched, isFetchSuccess, reset]);

  const onSubmit = ({ content, tags }) => {
    editPost({ id, content, tags });
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
    handleSubmit, control, setValue, onSubmit, isFetching, isFetchSuccess, isErrorFetch,
  };
}
