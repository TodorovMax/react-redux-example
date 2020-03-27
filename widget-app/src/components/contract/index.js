import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const Contract = ({
  user,
  contractState,
  status,
  link,
  getContract,
  handleContractHandler,
  statusData,
  participants,
}) => {
  useEffect(() => {
    if (!contractState) {
      getContract(user);
    }
  }, [contractState, getContract, user]);

  const createContractHandler = () => {
    handleContractHandler(true);
  };

  const renderParticipants = participants.map((participant, id) => (
    <div key={id} className="contract-field">
      <span className="key">{participant.subject}:</span>
      <span className="value">
        {participant.description ? participant.description : 'Not opened'}
      </span>
    </div>
  ));

  const renderStatusData = Object.keys(statusData).map((key, id) => (
    <div key={id}>
      <span className="key">{key}:</span>
      <span className="value">{statusData[key]}</span>
    </div>
  ));

  return (
    <div className="contract">
      {!contractState ? (
        <>
          <Button
            className="action-btn"
            disabled={!user}
            onClick={createContractHandler}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create contract
          </Button>
        </>
      ) : (
        <>
          <div className="contract-field">
            <span className="key">Status:</span>
            <span className={'value status-value ' + status}>{status}</span>
          </div>
          <div className="recipients-container">{renderParticipants}</div>
          <div className="contract-dates">{renderStatusData}</div>
          {link && (
            <a rel="noopener noreferrer" target="_blank" href={link}>
              <Button className="action-btn wide">View contract</Button>
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default Contract;
