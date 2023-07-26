import {
  alpha, Badge, Card,
  CardActions, CardContent, CardHeader,
  Grid, IconButton, Menu, MenuItem, Stack, Typography,
} from '@mui/material';
import {
  ChatBubble, Delete, Edit, MoreVert,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';
import PropTypes from 'prop-types';
import TagChip from './TagChip';
import EditPostForm from './EditPostForm';
import { useAppSelector } from '../redux';
import { usePostDeleteMutation } from '../redux/api';
import timeAgo from '../utils/timeAgo';
import UserAvatar from './UserAvatar';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Post({ post }) {
  const currentUserId = useAppSelector((state) => state.user.user.id);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const open = Boolean(anchorEl);
  const [deletePost] = usePostDeleteMutation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const commentCount = Array.isArray(post.comment) ? post.comment.length : post.comment;
  return (
    <>
      <Card
        sx={{ width: 'full' }}
      >
        <CardHeader
          avatar={(
            // <Avatar sx={{ bgcolor: red[500] }}>
            //   {post.user.name.split(' ').map((word) => word.charAt(0))}
            // </Avatar>
            <UserAvatar user={post.user} />
        )}
          action={(
            currentUserId === post.user.id
              && (
              <IconButton onClick={handleClick}>
                <MoreVert />
              </IconButton>
              )

        )}
          title={(
            <Grid direction="row" container spacing={1} alignItems="baseline">
              <Grid item>
                <Typography variant="h6">
                  {`${post.user.name}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color="gray">
                  {`@${post.user.username}`}
                </Typography>
              </Grid>
            </Grid>
        )}
          subheader={`${post.parentId ? 'commented' : 'posted'} at ${timeAgo(post.createdAt)}`}
        />
        {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
        <CardContent>
          <Stack spacing={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              onClick={() => post.id && navigate(`/post/${post.id}`)}
            >
              {post.content}
            </Typography>
            { post.tags && (
              <Stack direction="row" spacing={1} style={{ maxWidth: '100%', overflow: 'auto' }}>
                { post.tags.map((t) => (
                  <TagChip name={t.name} id={t.id} key={JSON.stringify(t)} />
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => post.id && navigate(`/post/${post.id}`)}>
            <Badge badgeContent={commentCount} color="primary">
              <ChatBubble />
            </Badge>
          </IconButton>
        </CardActions>
      </Card>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); setEditModal(true); }} disableRipple>
          <Edit />
          Edit
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); deletePost({ id: post.id }); }} disableRipple>
          <Delete />
          Delete
        </MenuItem>
      </StyledMenu>
      {post.id && <EditPostForm changeState={setEditModal} state={editModal} id={post.id} />}
    </>
  );
}
Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    ),
    comment: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
    parentId: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
