// hooks/useSignUpForm.js
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRegisterMutation } from '../redux/api/authApi';

export default function useSignUpForm() {
  const [signup, {
    isLoading, isError, error, isSuccess,
  }] = useRegisterMutation();
  const defaultValues = {
    username: '',
    email: '',
    password: '',
  };
  const {
    handleSubmit, control, setValue, setError,
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => {
    signup(data);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/home');
    }

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
  }, [navigate, isError, error, isLoading, isSuccess, setError]);

  return {
    handleSubmit, control, setValue, onSubmit,
  };
}
