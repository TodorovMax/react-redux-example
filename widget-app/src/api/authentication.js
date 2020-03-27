import { executionContext, oneflowParent, Api } from './index';

export const getSecurityRoles = () => {
  return executionContext.userSettings.securityRoles;
};

export const getEnabledEntities = () => {
  var query = '?$select=of_entityname,of_name,statuscode,of_oneflowentityid';
  return Api.retrieveMultipleRecords('of_oneflowentity', query);
};

export const getCurrentEntity = () => {
  return oneflowParent.Page.data.entity.getEntityName();
};
