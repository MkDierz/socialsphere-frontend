import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import TagChip from './TagChip';

export default function Tags({ post }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      style={{
        maxWidth: '100%',
        overflow: 'auto',
      }}
    >
      {post.tags.map((t) => <TagChip name={t.name} id={t.id} key={JSON.stringify(t)} />)}
    </Stack>
  );
}
Tags.propTypes = {
  post: PropTypes.shape({
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
