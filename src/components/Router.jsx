import { MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import PropTypes from 'prop-types';

export default function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

Router.propTypes = {
  children: PropTypes.node.isRequired,
};
