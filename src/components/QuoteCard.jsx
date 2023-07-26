import { FormatQuote } from '@mui/icons-material';
import {
  Card, CardContent, Stack, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

function QuoteCard({ quote, author }) {
  return (
    <Card
      color="text."
      sx={{
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <CardContent sx={{
        position: 'relative',
        padding: 2,
      }}
      >
        <Stack direction="row" justifyContent="center">
          <FormatQuote />
          <Typography
            variant="h6"
            fontStyle="italic"
            fontFamily="sans-serif"
            margin={1}
          >
            {quote}
          </Typography>
          <FormatQuote sx={{ rotate: '180deg', placeSelf: 'end' }} />
        </Stack>
        <Typography
          variant="subtitle1"
          position="absolute"
          fontSize={13}
          bottom={0}
          right={0}
        >
          {'- '}
          {author}
        </Typography>
      </CardContent>
    </Card>
  );
}

QuoteCard.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
export default QuoteCard;
