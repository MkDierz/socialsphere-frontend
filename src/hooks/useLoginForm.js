// hooks/useLoginForm.js
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux';
import { selectIsAuthenticated } from '../redux/reducer/authSlice';
import { useLoginMutation } from '../redux/api/authApi';

export default function useLoginForm() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [login, {
    isLoading, isError, error, isSuccess,
  }] = useLoginMutation();
  const defaultValues = {
    email: '',
    password: '',
  };
  const {
    handleSubmit, control, setValue, setError,
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => {
    login(data);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
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
  }, [isAuthenticated, navigate, isError, error, isLoading, isSuccess, setError]);

  return {
    handleSubmit, control, setValue, onSubmit,
  };
}
