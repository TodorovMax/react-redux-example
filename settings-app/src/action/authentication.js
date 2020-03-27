import { SETUSER, ROLEID } from '../constants/authentication';
import { getSecurityRoles } from '../api/authentication';
import { showAlert } from '../helpers/alerts';

export const setUser = () => (dispatch) => {
  const currentUserRoles = getSecurityRoles();

  const currentUserRole = currentUserRoles.find((role) => role === ROLEID);
  if (currentUserRole) {
    return dispatch({ type: SETUSER, payload: 'Admin' });
  }
  return showAlert('You are not Admin');
};
