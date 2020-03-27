import { oneflowParent } from '../api';

export const showAlert = (errorMessage) => {
  const alertStrings = { text: errorMessage };
  const alertOptions = { height: 120, width: 260 };
  oneflowParent.Navigation.openAlertDialog(alertStrings, alertOptions).then(
    () => {},
  );
};
