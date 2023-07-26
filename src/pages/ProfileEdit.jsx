import {
  Button,
  Container, Stack, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';
import { EditProfileForm } from '../components';

function ProfileEdit() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Stack spacing={2} p={2}>
        <Button
          sx={{
            width: '100%',
            justifyItems: 'self-start',
            alignItems: 'center',
            flex: true,
          }}
          variant="text"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIos />}
        >
          Back
        </Button>
        <Typography variant="h4">
          Edit Profile
        </Typography>
        <EditProfileForm />
      </Stack>
    </Container>
  );
}
export default ProfileEdit;
