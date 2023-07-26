import { Avatar, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { stringAvatar } from '../utils';

function UserAvatar({ user }) {
  const navigate = useNavigate();
  const { sx, children } = stringAvatar(user.name);
  if (!user.avatar) {
    return (
      <IconButton sx={{ p: 0 }} onClick={() => navigate(`/profile/${user.id}`)}>
        <Avatar sx={sx}>
          {children}
        </Avatar>
      </IconButton>
    );
  }
  return (
    <IconButton sx={{ p: 0 }} onClick={() => navigate(`/profile/${user.id}`)}>
      <Avatar src={`/api/user/${user.avatar}`} />
    </IconButton>
  );
}
UserAvatar.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
};
export default UserAvatar;
