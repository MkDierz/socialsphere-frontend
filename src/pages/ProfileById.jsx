import { Container, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import QuoteCard from '../components/QuoteCard';
import { usePostsByUserQuery, useProfileByIdQuery } from '../redux/api';
import { Post } from '../components';
import LoadingError from '../components/LoadingError';

function UserProfileById() {
  const { id } = useParams();
  const { data: user, isProfileFetching, isProfileError } = useProfileByIdQuery(id);
  const userStatus = (isProfileFetching || isProfileError || (!user));
  const { data, isFetching, isError } = usePostsByUserQuery(id);
  const postStatus = (isFetching || isError);

  return (
    <Container spacing={2} maxWidth="md" mx="auto">
      <Stack spacing={2}>
        {(userStatus) ? <LoadingError isLoading={isProfileFetching} /> : (
          <>
            <ProfileCard user={user} profile={user.Profile} />
            {user.Profile.bio && (<QuoteCard author={user.username} quote={user.Profile.bio} />) }
          </>
        )}
        {(postStatus) ? (<LoadingError isLoading={isFetching} />) : data.map((d) => (
          <Post
            key={JSON.stringify(d)}
            sx={{ my: 2 }}
            post={d}
          />
        ))}
      </Stack>
    </Container>
  );
}

export default UserProfileById;
