import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const SidebarInfo = ({ integration, compatible, errors }) => (
  <div className="text-container">
    <p className="title">Integration Status</p>
    <p className="bold-text">
        Integration enabled:
      {' '}
      {integration ? <CheckIcon /> : <ClearIcon />}
    </p>
    <p className="bold-text">
      {' '}
        Connection state:
      {' '}
      {integration ? <CheckIcon /> : <ClearIcon />}
    </p>
    <p className="bold-text">
        System compatible:
      {' '}
      {compatible ? <CheckIcon /> : <ClearIcon />}
    </p>
    {errors.noEntities && (
    <p className="bold-text error">{errors.noEntities}</p>
    )}
    {errors.noRel && <p className="bold-text error">{errors.noRel}</p>}
  </div>
);

export default SidebarInfo;
