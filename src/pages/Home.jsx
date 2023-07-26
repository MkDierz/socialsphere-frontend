import { Cached, ExpandMore } from '@mui/icons-material';
import {
  Accordion, AccordionDetails, AccordionSummary,
  Container, Grid, IconButton, Stack, Typography,
} from '@mui/material';
import LoadingError from '../../LoadingError';
import { usePostsQuery } from '../redux/api';
import {
  CreatePostForm, Post,
} from '../components';

function Home() {
  const {
    data, isLoading, refetch, isError,
  } = usePostsQuery();
  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        alignItems="stretch"
        spacing={2}
        sx={{
          maxWidth: 'xs',
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container direction="row" alignItems="stretch" spacing={2}>
          <Grid item xs>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Create Post</Typography>
              </AccordionSummary>
              <AccordionDetails color="blue">
                <CreatePostForm />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item>
            <IconButton onClick={() => refetch()}>
              <Cached />
            </IconButton>
          </Grid>
        </Grid>

        {(isLoading || isError) ? (<LoadingError isLoading={isLoading} />) : data.map((d) => (
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
export default Home;
