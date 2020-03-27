import { setCompatible, setInfoSidebarError } from '../constants/info';
import { getSystemCompatible } from '../api/info';
import { showAlert } from '../helpers/alerts';

export const getCompatible = () => (dispatch) => getSystemCompatible().then((response) => {
  const data = JSON.parse(JSON.parse(response.responseText).Result);
  if (data.isCompatible) {
    return dispatch({ type: setCompatible, payload: true });
  }
  showAlert('Error in Checking your system for compatibility');

  const noEntities = JSON.stringify(data.inexistingEntities);
  const noRel = JSON.stringify(data.inexistingRelationships);

  return dispatch({
    type: setInfoSidebarError,
    payload: { noEntities, noRel },
  });
});
