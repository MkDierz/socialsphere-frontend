import { useParams } from 'react-router-dom';
import {
  Card, CardHeader, Container, Stack, Typography,
} from '@mui/material';
import { Tag } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { useTagByIdQuery } from '../redux/api/tagApi';
import LoadingError from '../components/LoadingError';

import { Post, UserAvatar } from '../components';
import { timeAgo } from '../utils';

function TagDetail() {
  const { id } = useParams();
  const {
    isFetching, isError, data,
  } = useTagByIdQuery(id, { skip: !id });
  return (
    <Stack py={2} spacing={2} direction="column" alignItems="center">
      <Container maxWidth="md" bgcolor={grey[900]}>
        { (isFetching || isError || (!data)) ? <LoadingError isLoading={isFetching} /> : (
          <Stack
            direction={{ lg: 'row', xs: 'column' }}
            justifyContent="center"
            alignItems={{ lg: 'center', xs: 'start' }}
            spacing={2}
          >
            <Stack alignItems="start" width="100%">
              <Typography variant="h4">
                <Tag />
                {data.name}
              </Typography>
              <Typography variant="subtitle2">
                {`Total post: ${data.postCount}`}
              </Typography>
            </Stack>
            <Stack width="100%" maxWidth={200}>
              <Typography variant="subtitle1">
                Created by
              </Typography>
              <Card>
                <CardHeader
                  title={data.creator.name}
                  subheader={timeAgo(data.createdAt)}
                  avatar={<UserAvatar user={data.creator} />}
                />
              </Card>
            </Stack>
          </Stack>
        )}
      </Container>
      <Container maxWidth="md">
        <Stack spacing={2}>
          { (isFetching || isError || (!data))
            ? <LoadingError isLoading={isFetching} /> : data.posts.map((d) => (
              <Post
                key={JSON.stringify(d)}
                sx={{ my: 2 }}
                post={d}
              />
            ))}
        </Stack>
      </Container>
    </Stack>
  );
}
export default TagDetail;
