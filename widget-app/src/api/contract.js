import { Api, oneflowParent } from './index';

const getCurrentEntityId = () => {
  return oneflowParent.Page.data.entity.getId().slice(1, -1);
};

export const postOpportunityProducts = agreementId => {
  const req = {};
  const dataObject = {
    opportunityId: getCurrentEntityId(),
    agreementId: parseInt(agreementId),
  };
  req.requestData = JSON.stringify(dataObject);
  req.getMetadata = () => ({
    boundParameter: null,
    parameterTypes: {
      requestData: {
        typeName: 'Edm.String',
        structuralProperty: 1,
      },
    },
    operationType: 0,
    operationName: 'of_AddProducts',
  });
  return Api.online.execute(req);
};

export const getOpportunityProducts = () => {
  const currentEntity = getCurrentEntityId();
  const query =
    "?$select=productname,opportunityproductid&$filter=_opportunityid_value eq '" +
    currentEntity +
    "'";
  return Api.retrieveMultipleRecords('opportunityproduct', query);
};

export const getContractData = () => {
  const currentEntity = getCurrentEntityId();
  const query =
    "?$select=of_contracturl,of_startson,of_contractidnumber,of_endedon,of_signedon,of_terminatedon,of_updatedon,of_senton, of_declinedon, of_activeuntil,of_lifecyclecode,of_expiredon,of_renewson,of_expireson,statuscode,createdon,modifiedon&$filter=_of_opportunityid_value eq '" +
    currentEntity +
    "'";
  return Api.retrieveMultipleRecords('of_oneflowcontract', query);
};

export const getParticipantinsights = () => {
  const currentEntity = getCurrentEntityId();
  const query =
    '?$select=description,subject,of_agreementnumber&$filter=_regardingobjectid_value eq ' +
    currentEntity;
  return Api.retrieveMultipleRecords('of_participantinsight', query);
};

export const getSelectors = type => {
  const request = {
    getMetadata: () => ({
      boundParameter: null,
      parameterTypes: {},
      operationType: 0,
      operationName: type,
    }),
  };
  return Api.online.execute(request);
};

export const postContract = (collection, template, selectedParticipants) => {
  const req = {};
  const dataObject = {
    opportunityId: getCurrentEntityId(),
    template_id: parseInt(template),
    collection_id: parseInt(collection),
    participants: [],
  };
  dataObject.participants = selectedParticipants;
  req.requestData = JSON.stringify(dataObject);
  req.getMetadata = () => ({
    boundParameter: null,
    parameterTypes: {
      requestData: {
        typeName: 'Edm.String',
        structuralProperty: 1,
      },
    },
    operationType: 0,
    operationName: 'of_CreateContract',
  });
  return Api.online.execute(req);
};

export const getConterparties = () => {
  const req = {};
  req.requestData = getCurrentEntityId();
  req.getMetadata = () => ({
    boundParameter: null,
    parameterTypes: {
      requestData: {
        typeName: 'Edm.String',
        structuralProperty: 1,
      },
    },
    operationType: 0,
    operationName: 'of_GetPossibleParticipants',
  });

  return Api.online.execute(req);
};

export const getCurrentFormType = () => {
  return oneflowParent.Page.ui.getFormType();
};

export const getIsDirty = () => {
  return oneflowParent.Page.data.getIsDirty();
};

export const getParentAccountId = () => {
  return oneflowParent.Page.getAttribute('parentaccountid').getValue();
};

export const getParentContactId = () => {
  return oneflowParent.Page.getAttribute('parentcontactid').getValue();
};
