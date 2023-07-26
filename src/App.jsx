import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';
import Routes from './routes';

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer
        position="bottom-right"
        autoClose={900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      <Routes />
    </>
  );
}

export default App;
