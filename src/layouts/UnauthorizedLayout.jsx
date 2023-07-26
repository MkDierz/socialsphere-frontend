import PropTypes from 'prop-types';
import withRouter from '../components/withRouter';

function UnauthorizedLayout({ children }) {
  return (
    <>
      {' '}
      {children}
      {' '}
    </>
  );
}

UnauthorizedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const UnauthorizedLayoutRouter = withRouter(UnauthorizedLayout);

export default UnauthorizedLayout;
export {
  UnauthorizedLayoutRouter, UnauthorizedLayout,
};
