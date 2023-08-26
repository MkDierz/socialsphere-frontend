import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { Footer, Navbar, withRouter } from '../components';
import { useProfileQuery } from '../redux/api/userApi';
import { useAppSelector } from '../redux';

function AuthorizedLayout({ children }) {
  const {
    isUninitialized, isLoading, isFetching, refetch,
  } = useProfileQuery();
  const userData = useAppSelector((state) => state.user.user);

  const notPassing = (
    isUninitialized || isLoading || isFetching || Object.keys(userData).length === 0
  );
  useEffect(() => {
    if (notPassing) {
      refetch();
    }
  }, [notPassing, refetch]);

  if (notPassing) {
    return (
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </div>
  );
}

AuthorizedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthorizedLayoutRouter = withRouter(AuthorizedLayout);

export default AuthorizedLayout;
export {
  AuthorizedLayoutRouter, AuthorizedLayout,
};
