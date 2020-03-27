import { Api } from './index';

export const getOneflowEntities = () => {
  const query = '$select=of_entityname,of_name,statuscode,of_oneflowentityid';
  return Api.retrieveMultipleRecords('of_oneflowentity', query);
};

export const changeIntegrationEntityState = (id, state) => {
  const data = { statecode: state === 1 ? 1 : 0 };

  return Api.updateRecord('of_oneflowentity', id, data);
};
