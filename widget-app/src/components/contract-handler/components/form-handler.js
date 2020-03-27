import React, { useState, useEffect } from 'react';
import Selectors from './selectors';
import Participants from './participants';
import Attachments from './attachments';
import { styles } from '../styles';
import InfoIcon from '../assets/info-icon.svg';

const FormHandler = ({
  templates,
  collections,
  contacts,
  createContract,
  opportunityProducts,
}) => {
  const [currentTemplate, setCurrentTemplate] = useState(templates[0]);
  const [currentCollection, setCurrentCollection] = useState(collections[0]);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setCurrentCollection(collections[0]);
  }, [collections]);

  useEffect(() => {
    if (currentTemplate) {
      const haveProductTable =
        currentTemplate.agreement.available_options.has_default_products_box;

      if (opportunityProducts.length > 0 && !haveProductTable) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [opportunityProducts, currentTemplate, setError]);

  const handleChangeSelectors = ({ target }) => {
    const value = parseInt(target.value);

    if (target.name === 'templates') {
      setCurrentTemplate(templates.find(template => template.value === value));
    } else if (target.name === 'collections') {
      setCurrentCollection(
        collections.find(collection => collection.value === value),
      );
    }
  };

  const handleChangeParticipants = ref => ({ target }) => {
    const tempParticipants = [...participants];
    if (target.name === 'participants') {
      const type = parseInt(ref.current.value);
      const index = tempParticipants.findIndex(
        participant => participant.contactId === target.value,
      );
      if (index >= 0) {
        tempParticipants.splice(index, 1);
        return setParticipants(tempParticipants);
      } else {
        tempParticipants.push({
          contactId: target.value,
          type: type,
        });
        return setParticipants(tempParticipants);
      }
    } else if (target.name === 'participants-type') {
      const check = tempParticipants.find(
        participant => participant.contactId === target.id,
      );
      if (check) {
        check.type = parseInt(target.value);
        return setParticipants(tempParticipants);
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const haveProductTable =
      currentTemplate.agreement.available_options.has_default_products_box;
    if (opportunityProducts.length > 0 && haveProductTable) {
      createContract(currentCollection, currentTemplate, participants, true);
    } else {
      createContract(currentCollection, currentTemplate, participants);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {currentCollection && (
        <Selectors
          setCurrentTemplate={setCurrentTemplate}
          handleChange={handleChangeSelectors}
          currentCollection={currentCollection}
          templates={templates}
          collections={collections}
        />
      )}
      <Participants handleChange={handleChangeParticipants} contacts={contacts} />
      <Attachments />
      <div style={styles.errorContainer}>
        {error && (
          <>
            <InfoIcon style={styles.svg} />
            <div style={styles.error}>
              Products will not be transferred. <br /> This template does not
              have a product table or has more than 1 product table. Because of
              this the contract will not receive the products associated with
              the opportunity.
            </div>
          </>
        )}
      </div>
      <div style={styles.btnContainer}>
        <button
          disabled={participants.length === 0}
          type="submit"
          title={
            participants.length === 0
              ? 'Chose at least 1 contact'
              : 'Create contract'
          }
          style={
            participants.length === 0 ? styles.disabledBtn : styles.actionBtn
          }
        >
          Create contract
        </button>
      </div>
    </form>
  );
};

export default FormHandler;
