import React from 'react';
import { Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { routes } from '../../routes';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    minHeight: '400px',
  },
}));

const Authentication = ({
  user,
  setUser,
  getSettings,
  getEntities,
  getCompatible,
}) => {
  const classes = useStyles();

  if (user) {
    getSettings();
    getEntities();
    getCompatible();
  } else {
    setUser();
  }

  return (
    <Grid item xs={9}>
      <Paper className={classes.paper}>
        {user ? <Switch>{routes}</Switch> : null}
      </Paper>
    </Grid>
  );
};

export default Authentication;
