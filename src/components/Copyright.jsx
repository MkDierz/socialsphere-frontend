/* eslint-disable react/jsx-props-no-spreading */
import { Link, Typography } from '@mui/material';

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        SocialSphere
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}
