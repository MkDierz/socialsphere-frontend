import { Container, Stack } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import QuoteCard from '../components/QuoteCard';
import { useAppSelector } from '../redux/store';
import { usePostsByUserQuery } from '../redux/api';
import { Post } from '../components';
import LoadingError from '../../LoadingError';

function UserProfile() {
  const { user, profile } = useAppSelector((state) => state.user);

  const { data, isFetching, isError } = usePostsByUserQuery(user.id);

  return (
    <Container maxWidth="md" mx="auto">
      <Stack spacing={2}>
        <ProfileCard user={user} profile={profile} />
        <QuoteCard author={user.username} quote={profile.bio} />
        {(isFetching || isError) ? (<LoadingError isLoading={isFetching} />) : (
          <>
            { data.length !== 0 && data.map((d) => (
              <Post
                key={JSON.stringify(d)}
                sx={{ my: 2 }}
                post={d}
              />
            ))}
            {' '}
          </>
        )}
      </Stack>
    </Container>
  );
}

export default UserProfile;
