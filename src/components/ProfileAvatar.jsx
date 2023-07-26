import { Avatar, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { stringAvatar } from '../utils';

function ProfileAvatar({ user }) {
  const { sx, children } = stringAvatar(user.name);

  if (!user.avatar) {
    return (
      <Stack
        justifyContent={{ sm: 'start', xs: 'center' }}
        alignItems={{ sm: 'start', xs: 'center' }}
        sx={{
          position: 'absolute',
          width: '100%',
          px: '20px',
          top: {
            sm: 150,
            xs: 100,
          },
        }}
      >
        <Avatar
          sx={{
            position: 'relative',
            width: 150,
            height: 150,
            border: '5px solid white',
            fontSize: 40,
            ...sx,
          }}
        >
          {children}
        </Avatar>
      </Stack>
    );
  }
  return (
    <Avatar src={user.avatar} sx={sx} />
  );
}
ProfileAvatar.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  })).isRequired,
};
export default ProfileAvatar;
