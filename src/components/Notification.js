import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Typography, Badge } from '@mui/material';
import { Notifications, Favorite, Chat } from '@mui/icons-material';
import { connect } from 'react-redux';
import { relativeTime, dayjs } from 'dayjs';
import { markNotificationsRead } from '../redux/actions/userActions';

function Notification(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const notifications = props.notifications;
  const [notificationIcon, setNotificationIcon] = useState(null);
  dayjs.extend(relativeTime);

  const handleOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = props.notifications
      .filter((noti) => !noti.read)
      .map((noti) => noti.notificationId);
    props.markNotificationsRead(unreadNotificationsIds);
  };

  if (notifications && notifications.length > 0) {
    setNotificationIcon(
      notifications.filter((notification) => notification.read === false)
        .length > 0 ? (
        <Badge
          badgeContent={
            notifications.filter((notification) => notification.read === false)
              .length
          }
        >
          <Notifications />
        </Badge>
      ) : (
        <Notifications />
      )
    );
  } else {
    setNotificationIcon(<Notifications />);
  }

  return (
    <>
      <IconButton
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        {notificationIcon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => {
            const verb = notification.type === 'like' ? 'liked' : 'commented';
            const time = dayjs(notification.createdAt).fromNow();
            const icon = notification.type === 'like' ? <Favorite /> : <Chat />;
            <MenuItem key={notification.createdAt} onClick={handleClose}>
              {icon}
              <Typography
                component={Link}
                variant="body1"
                to={`/user/${notification.recipient}/scream/${notification.postId}`}
              >
                {notification.sender} {verb} your post {time}
              </Typography>
            </MenuItem>;
          })
        ) : (
          <MenuItem onClick={handleClose}>
            You have no notifications yet!
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notification
);
