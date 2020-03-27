import React, { useEffect } from 'react';
import Header from '../../containers/header';
import Contract from '../../containers/contract';
import ContractHandler from '../../containers/contract-handler';
import Loading from '../../containers/loading';
import Footer from '../footer';

const Authentication = ({ setUser, setWidgetState, widgetState }) => {
  useEffect(() => {
    setUser();
    if (!widgetState) {
      setWidgetState();
    }
  }, [setUser, setWidgetState, widgetState]);

  return (
    <>
      {widgetState ? (
        <>
          <Loading />
          <Header />
          <Contract />
          <Footer />
          <ContractHandler />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Authentication;
