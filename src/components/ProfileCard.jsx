import { Edit, LocationOn } from '@mui/icons-material';
import {
  Button, Card, CardContent, IconButton, Paper, Stack, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { useAppSelector } from '../redux';
import ProfileAvatar from './ProfileAvatar';

export default function ProfileCard({ user, profile }) {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.user.id);
  const isSelfProfile = userId === user.id;
  return (
    <Paper sx={{
      p: '0rem',
      mt: 2,
      position: 'relative',
    }}
    >
      <Card
        sx={{
          height: 200,
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          objectFit: 'cover',
        }}
        component="img"
        src={`/api/user/${profile.cover}`}
        alt={user.username}
      />
      <ProfileAvatar
        user={user}
      />
      <CardContent sx={{
        p: 1,
        pl: {
          xs: 1,
          sm: '180px',
        },
        pr: {
          xs: 1,
          sm: 1,
        },
        pt: {
          xs: 7,
          sm: 2,
        },
      }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          position="relative"
        >
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            {user.name}
          </Typography>
          {isSelfProfile && (
            <IconButton
              onClick={() => navigate('/profile/edit/')}
              sx={{
                position: { xs: 'absolute', sm: 'relative' },
                bottom: 0,
                right: 0,
              }}
            >
              <Edit />
            </IconButton>
          )}
          {(!isSelfProfile) && (
          <Button
            sx={{
              position: { xs: 'absolute', sm: 'relative' },
              bottom: { xs: 50, sm: 0 },
              right: { xs: 0, sm: 0 },
            }}
            variant="outlined"
          >
            Add Friend
          </Button>
          )}
        </Stack>
        <Typography variant="h6" color="text.blue" sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
          {`@${user.username}`}
        </Typography>
        { profile.location && (
          <Typography variant="body2" sx={{ textAlign: { xs: 'center', sm: 'start' } }} color="lightblue">
            <LocationOn sx={{ height: 15, width: 15 }} />
            {profile.location}
          </Typography>
        ) }

      </CardContent>
    </Paper>
  );
}
ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    // Add other properties of the "user" object and their PropTypes
  }).isRequired,
  profile: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    location: PropTypes.string,
    // Add other properties of the "profile" object and their PropTypes
  }).isRequired,
};
