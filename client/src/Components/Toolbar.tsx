import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MaterialToolbar from '@material-ui/core/Toolbar';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { joinClasses } from '../util/join-classes';
import { StandardProps } from '../util/standard-props';

const styles = createStyles({
  root: {},
  logo: {
    height: 60,
    marginRight: 10,
  },
  title: {
    fontSize: 26,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  }
});

type Props = WithStyles<typeof styles> & StandardProps;

export const ToolbarUnstyled = (
  {classes, className}: Props
) => {
  return (
    <AppBar 
      className={joinClasses(classes.root, className)} 
      position="static" 
      color="primary">
      <MaterialToolbar className={classes.toolbar}>
        <div className={classes.title}>
          Vote Chain
        </div>
        <div style={{flex: 1}} />
      </MaterialToolbar>
    </AppBar>
  );
};

export const Toolbar = withStyles(styles)(ToolbarUnstyled);