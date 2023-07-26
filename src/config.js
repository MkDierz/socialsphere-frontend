import { createTheme } from '@mui/material';
import LinkBehavior from './components/LinkBehavior';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

const BASE_URL = import.meta.env.VITE_BASE_URL || `http://${window.location.hostname}/api`;
export { theme, BASE_URL };
