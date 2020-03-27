import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();

  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event, tab) => {
    setActiveTab(tab);
  };

  return (
    <Paper className={classes.paper}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="INFO" to="/" component={Link} />
        <Tab label="Settings" to="/settings" component={Link} />
        <Tab label="Integration" to="/integration" component={Link} />
      </Tabs>
    </Paper>
  );
};

export default Header;
