import React from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const Integration = ({ entities, changeEntityState }) => {
  const changeState = (id, state) => () => {
    changeEntityState(id, state);
  };

  const entitiesItems = entities.map((entity) => (
    <Grid
      container
      style={{ cursor: 'pointer' }}
      key={entity.of_oneflowentityid}
    >
      <Grid className="bold-text" item xs={5}>
        {entity.of_name}
      </Grid>
      <Grid item xs={5}>
        <Switch
          checked={entity.statuscode === 1}
          onChange={changeState(entity.of_oneflowentityid, entity.statuscode)}
          color="primary"
        />
      </Grid>
    </Grid>
  ));

  return (
    <div className="text-container">
      <Grid container>
        <Grid container style={{ marginBottom: '20px' }}>
          <Grid className="title" item xs={5}>
            Entity Name
          </Grid>
          <Grid className="title" item xs={5}>
            Status
          </Grid>
        </Grid>
        {entitiesItems}
      </Grid>
    </div>
  );
};

export default Integration;
