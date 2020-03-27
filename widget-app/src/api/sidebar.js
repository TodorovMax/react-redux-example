import { Api } from './index';

export const deleteRecord = contractId => {
  return Api.deleteRecord('of_oneflowcontract', contractId);
};
