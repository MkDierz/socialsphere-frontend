import PropTypes from 'prop-types';
import { useEffect } from 'react';
import withRouter from '../components/withRouter';
import { useAppSelector } from '../redux';

function Protected({ children, router }) {
  const { navigate } = router;
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (<> </>);
  }

  return (
    <>
      {' '}
      { children }
      {' '}
    </>
  );
}
Protected.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const ProtectedWithRouter = withRouter(Protected);

export { Protected, ProtectedWithRouter };
