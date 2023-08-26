import { ExpandMore } from '@mui/icons-material';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Typography,
} from '@mui/material';
import Log from './Log';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        maxHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Accordion disableGutters square>
        <AccordionSummary disableGutters expandIcon={<ExpandMore />} xs={{ p: 1 }}>
          <Typography>Logs</Typography>
        </AccordionSummary>
        <AccordionDetails color="blue" sx={{ p: 0 }}>
          <Box sx={{
            maxHeight: '40vh',
            scrollbarWidth: 'none',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '&-ms-overflow-style:': {
              display: 'none',
            },
          }}
          >
            <Log />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
