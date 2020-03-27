import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SidebarInfo from '../../containers/sidebar/sidebar-info';
import SidebarSettings from './components/sidebar-settings';
import SidebarIntegration from './components/sidebar-integration';
import OneflowLogo from './assets/oneflow-logo.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    minHeight: '400px',
  },
  sidebarImg: {
    display: 'block',
    width: '90%',
    margin: '0 auto',
    borderBottom: '6px dotted #3d4557',
  },
}));

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Grid item xs={3}>
      <Paper className={classes.paper}>
        <img
          className={classes.sidebarImg}
          src={OneflowLogo}
          alt="OneflowLogo"
        />
        <Switch>
          <Route
            key="3"
            path="/integration"
            children={() => <SidebarIntegration />}
          />
          <Route
            key="2"
            path="/settings"
            children={() => <SidebarSettings />}
          />
          <Route key="1" path="/" children={() => <SidebarInfo />} />
        </Switch>
      </Paper>
    </Grid>
  );
};

export default Sidebar;
