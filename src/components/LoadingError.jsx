import { ErrorAlert, Loading } from '.';

export default function LoadingError({ isLoading }) {
  return (
    <>
      {' '}
      {isLoading ? <Loading /> : <ErrorAlert />}
      {' '}
    </>
  );
}
