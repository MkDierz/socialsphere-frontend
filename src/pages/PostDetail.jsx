import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Stack } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { usePostByIdQuery } from '../redux/api';
import { CreatePostForm, Post } from '../components';
import LoadingError from '../components/LoadingError';

function GotoParentButton({ hasParent, action }) {
  return (
    hasParent && (
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={action}
        endIcon={<ArrowUpward />}
      >
        Go to parent post
      </Button>
    )
  );
}
GotoParentButton.propTypes = {
  hasParent: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
};

function PostChild({ comment }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Post post={comment} />
      </TimelineContent>
    </TimelineItem>
  );
}
PostChild.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = usePostByIdQuery(id);

  return (
    <Container maxWidth="xl">
      <Stack spacing={2} sx={{ mx: 'auto', p: 2 }}>
        { (isLoading || isError) ? (<LoadingError isLoading={isLoading} />) : (
          <>
            <GotoParentButton hasParent={data.parentId} action={() => navigate(`/post/${data.parentId}`)} />
            <Post post={data} />
            <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 } }}>
              {data.comment.map((comment) => (
                <PostChild comment={comment} key={comment.id} />
              ))}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>
                  <CreatePostForm parentId={data.id} />
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </>
        )}
      </Stack>
    </Container>
  );
}

export default PostDetail;
