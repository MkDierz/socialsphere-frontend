import { SvgIcon } from '@mui/material';

function MainIcon(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SvgIcon {...props}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 9C17 6.26488 13.4183 4.04762 9 4.04762C4.58172 4.04762 1 6.26488 1 9" stroke="#60A5FA" />
        <path d="M9 0.999999C6.26488 1 4.04762 4.58172 4.04762 9C4.04762 13.4183 6.26488 17 9 17" stroke="#60A5FA" />
        <path d="M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#3B82F6" />
      </svg>
    </SvgIcon>

  );
}
export default MainIcon;
