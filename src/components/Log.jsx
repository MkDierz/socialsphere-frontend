import { Box, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const { logs } = state.log;
  return { logs };
}
function LogItem({ log }) {
  const {
    type, url, sizeOrigin, sizeAfter, time,
  } = log;
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography sx={{ fontFamily: 'Monospace', lineHeight: 1, fontSize: 12 }}>
        {'time: '}
        {time}
        {' | type: '}
        {type}
        {' | sizeOrigin: '}
        {sizeOrigin}
        {' bytes'}
        {' | sizeAfter: '}
        {sizeAfter}
        {' bytes'}
        {' | url: '}
        {url}
      </Typography>
    </Box>
  );
}

const Log = connect(mapStateToProps)(({ logs }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);
  return logs.map(((log) => (
    <>
      <LogItem log={log} key={JSON.stringify(log)} />
      <div ref={scrollRef} />
    </>
  )));
});

export default Log;
