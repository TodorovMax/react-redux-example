import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import FormHandler from './components/form-handler';
import CloseIcon from './assets/close.svg';
import Loading from '../loading';
import { styles } from './styles';
import OnefowLogo from './assets/oneflow-symbol-dark.svg';

const ContractHandler = ({
  contractHandlerState,
  handleContractHandler,
  createContract,
  contacts,
  getContactsData,
  templates,
  collections,
  getContractSelectors,
  loader,
  opportunityProducts,
}) => {
  const divRef = useRef();

  useEffect(() => {
    if (contacts.length === 0 && contractHandlerState) {
      getContactsData();
    }
  }, [contacts, getContactsData, contractHandlerState]);

  useEffect(() => {
    if (collections.length === 0 && contractHandlerState) {
      getContractSelectors();
    }
  }, [collections, getContractSelectors, contractHandlerState]);

  useEffect(() => {
    const parent = window.parent.document;
    const parentBody = parent.querySelector('body');
    const div = parent.createElement('div');
    divRef.current = div;
    parentBody.appendChild(div);

    return () => {
      parentBody.removeChild(divRef.current);
    };
  }, []);

  const closeContractHandler = () => {
    handleContractHandler(false);
  };

  if (!contractHandlerState) return null;

  return ReactDOM.createPortal(
    <div style={styles.popupContainer}>
      <div style={styles.popup}>
        <Loading
          state={contacts.length === 0 || collections.length === 0 || loader}
        />
        <CloseIcon style={styles.closeBtn} onClick={closeContractHandler} />
        <p style={styles.title}>Create Contract</p>
        <FormHandler
          templates={templates}
          collections={collections}
          contacts={contacts}
          createContract={createContract}
          opportunityProducts={opportunityProducts}
        />
        <div style={styles.footerLogo}>
          <OnefowLogo style={styles.svg} />
          Powered by Oneflow
        </div>
      </div>
    </div>,
    divRef.current,
  );
};

export default ContractHandler;
