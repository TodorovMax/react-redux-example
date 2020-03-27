import { SETUSER, ROLEID, SETWIDGETSTATUS } from '../constants/authentication';
import {
  getSecurityRoles,
  getEnabledEntities,
  getCurrentEntity,
} from '../api/authentication';

export const setUser = () => dispatch => {
  const currentUserRoles = getSecurityRoles();

  const currentUserRole = currentUserRoles.find(role => role === ROLEID);
  if (currentUserRole) {
    return dispatch({ type: SETUSER, payload: true });
  }
};

export const setWidgetState = () => dispatch => {
  return getEnabledEntities().then(data => {
    const currentEntity = getCurrentEntity();

    const opportunity = data.entities.find(
      entity => entity.of_entityname === currentEntity,
    );

    if (opportunity) {
      const statusCode = opportunity.statuscode;
      if (statusCode === 1)
        return dispatch({ type: SETWIDGETSTATUS, payload: true });
    }
  });
};
