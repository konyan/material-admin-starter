import React, { Fragment, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
  Fab,
  Badge
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutline';

import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280
  },
  root: {
    backgroundColor: theme.palette.white
  },
  list: {
    padding: theme.spacing(1, 3)
  },
  listItemText: {
    marginRight: theme.spacing(1)
  },
  lastActivity: {
    whiteSpace: 'nowrap'
  },
  fab: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    zIndex: theme.zIndex.drawer - 100
  }
}));

const ChatBar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!data) {
    return null;
  }

  const onlineConnections = data.connections.filter(
    connection => connection.active
  ).length;

  return (
    <Fragment>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawer }}
        elevation={1}
        onClose={handleClose}
        open={open}
        variant="temporary"
      >
        <div
          {...rest}
          className={clsx(classes.root, className)}
        >
          {data.groups.map(group => (
            <List
              className={classes.list}
              key={group.id}
              subheader={
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {group.name}
                </ListSubheader>
              }
            >
              {data.connections
                .filter(connection => group.id === connection.group)
                .map(connection => (
                  <ListItem
                    disableGutters
                    key={connection.id}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Person"
                        component={RouterLink}
                        src={connection.avatar}
                        to="/profile/1/timeline"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.listItemText}
                      disableTypography
                      primary={
                        <Typography
                          component={RouterLink}
                          display="block"
                          noWrap
                          to="/profile/1/timeline"
                          variant="h6"
                        >
                          {connection.name}
                        </Typography>
                      }
                    />
                    {connection.active ? (
                      <StatusBullet
                        color="success"
                        size="small"
                      />
                    ) : (
                      <Typography
                        className={classes.lastActivity}
                        variant="body2"
                      >
                        {moment(connection.lastActivity).fromNow()}
                      </Typography>
                    )}
                  </ListItem>
                ))}
            </List>
          ))}
        </div>
      </Drawer>
      <span
        className={clsx(classes.fab, {
          [classes.shiftFab]: open
        })}
      >
        <Badge
          badgeContent={onlineConnections}
          color="error"
        >
          <Fab
            color="primary"
            onClick={handleOpen}
          >
            <PeopleIcon />
          </Fab>
        </Badge>
      </span>
    </Fragment>
  );
};

ChatBar.propTypes = {
  className: PropTypes.string
};

export default ChatBar;
