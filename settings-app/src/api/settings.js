import { Api, oneflowRequest } from './index';

export const getOneflowSettings = () => {
  const query = '$top=1&$select=of_apitoken,of_integrationenabled,of_apiurl,of_apitoken,of_number,of_account';
  return Api.retrieveMultipleRecords('of_oneflowsettings', query);
};

export const getSettingsFormData = () => oneflowRequest('of_OneflowPing');

export const getSettingsPosition = () => oneflowRequest('of_GetPosition');

export const updateOneflowSettings = (settingsData) => Api.updateRecord(
  'of_oneflowsetting',
  'AAC2DDC3-37C8-E911-A967-000D3AB3F103',
  settingsData,
);

export const postToken = (token) => {
  const data = {
    of_name: 'OneFlow Setting',
    of_apitoken: token,
    of_integrationenabled: true,
  };

  return Api.updateRecord(
    'of_oneflowsetting',
    'AAC2DDC3-37C8-E911-A967-000D3AB3F103',
    data,
  );
};
