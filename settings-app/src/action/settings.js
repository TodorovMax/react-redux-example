import {
  getOneflowSettings,
  getSettingsFormData,
  postToken,
  getSettingsPosition,
  updateOneflowSettings,
} from '../api/settings';
import { setSettingsAccount, setSettingsReg } from '../constants/settings';
import { setIntegrationState } from '../constants/common';
import { showAlert } from '../helpers/alerts';

export const getSettings = () => (dispatch) => getOneflowSettings().then((data) => {
  const record = data.entities[0] ? data.entities[0] : false;
  if (record) {
    if (record.of_account || record.of_number) {
      dispatch({ type: setSettingsAccount, payload: record.of_account });
      dispatch({ type: setSettingsReg, payload: record.of_number });
    }

    if (record.of_integrationenabled) {
      return getSettingsFormData().then((response) => {
        const data = JSON.parse(JSON.parse(response.responseText).Result);
        if (data.statuscode === 200) {
          return dispatch({ type: setIntegrationState, payload: true });
        }
      });
    }
  }
});

export const setToken = (token) => (dispatch) => {
  postToken(token).then(() => {
    getSettingsPosition().then((response) => {
      const responseResult = JSON.parse(
        JSON.parse(response.responseText).Result,
      );

      if (responseResult.oneflowResponse.collection.length === 0) {
        showAlert('No Position. Contact your OneFlow Administrator');
      } else {
        const selectedCollection = responseResult.oneflowResponse.collection[0];
        const accountInfo = {
          orgnr: selectedCollection.account.orgnr,
          fullname: selectedCollection.fullname,
        };

        dispatch({ type: setSettingsAccount, payload: accountInfo.fullname });
        dispatch({ type: setSettingsReg, payload: accountInfo.orgnr });

        const settingsData = {
          of_account: accountInfo.fullname,
          of_number: accountInfo.orgnr,
        };

        updateOneflowSettings(settingsData);
      }
    });

    getSettings()(dispatch);
  });
};
