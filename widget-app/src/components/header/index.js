import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from './assets/delete-icon.svg';

const Header = ({ user, contractState, deleteContract }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const openConfirmation = () => {
    setModalOpen(true);
  };

  const closeConfirmation = () => {
    setModalOpen(false);
  };

  const deleteCurrentContract = () => {
    setModalOpen(false);
    deleteContract();
  };

  const renderModal = () => {
    if (!isModalOpen) {
      return null;
    }

    return (
      <div className="modal-container">
        <div className="modal">
          <span className="modal-title">
            Are you sure you want to delete this Contract? This action cannot be
            undone.
          </span>
          <div>
            <Button onClick={deleteCurrentContract}>Confirm</Button>
            <Button onClick={closeConfirmation}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="header">
      <span className="title">Oneflow</span>
      {user && contractState && (
        <IconButton
          onClick={openConfirmation}
          className="deleteIcon"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      )}
      {renderModal()}
    </div>
  );
};

export default Header;
