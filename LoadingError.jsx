import { ErrorAlert, Loading } from './src/components';

export default function LoadingError({ isLoading }) {
  return (
    <>
      {' '}
      {isLoading ? <Loading /> : <ErrorAlert />}
      {' '}
    </>
  );
}
