import { oneflowParent } from '../api';

/**
 * Show Error dialog based on D365 openAlertDialog.
 * https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openalertdialog
 * Default Height 180px, Width 250px
 *
 * @param {string} errorMessage error message, required.
 * @param {number} errorHeight default height, optional.
 * @param {number} errorWidth default Width, optional.
 */
export const showAlert = (errorMessage, errorHeight = 180, errorWidth = 250) => {
  const alertStrings = { text: errorMessage };
  const alertOptions = { height: errorHeight, width: errorWidth };
  oneflowParent.Navigation.openAlertDialog(alertStrings, alertOptions).then(
    () => {
    },
  );
};
