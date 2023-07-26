import { Tag } from '@mui/icons-material';
import { Chip } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function TagChip({ name, id }) {
  const navigate = useNavigate();
  return (
    <Chip icon={<Tag />} label={name} variant="outlined" clickable onClick={() => navigate(`/tag/${id}`)} />
  );
}
TagChip.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
export default TagChip;
