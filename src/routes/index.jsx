import { Navigate, Route, Routes } from 'react-router-dom';

// Layouts
import { UnauthorizedLayoutRouter } from '../layouts/UnauthorizedLayout';
import { AuthorizedLayoutRouter } from '../layouts/AuthorizedLayout';

// routes
import { authProtectedRoutes, publicRoutes } from './routes';
import { ProtectedWithRouter } from './Protected';

function Index() {
  return (
    <Routes>
      <Route>
        {publicRoutes.map(({ Component, ...route }) => (
          <Route
            path={route.path}
            element={(
              <UnauthorizedLayoutRouter>
                <Component />
              </UnauthorizedLayoutRouter>
            )}
            key={route}
            exact
          />
        ))}
      </Route>

      <Route>
        {authProtectedRoutes.map(({ Component, ...route }) => (
          <Route
            path={route.path}
            element={(
              <ProtectedWithRouter>
                <AuthorizedLayoutRouter>
                  <Component />
                </AuthorizedLayoutRouter>
              </ProtectedWithRouter>
            )}
            key={route}
            exact
          />
        ))}
        <Route
          path="/"
          element={(
            <Navigate to="/home" />
            )}
          exact
        />
        <Route
          path="*"
          element={(
            <Navigate to="/home" />
            )}
        />
      </Route>
    </Routes>
  );
}

export default Index;
