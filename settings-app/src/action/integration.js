import {
  getOneflowEntities,
  changeIntegrationEntityState,
} from '../api/integration';
import {
  setIntegrationEntities,
  changeIntegrationEntity,
} from '../constants/integration';

export const getEntities = () => (dispatch) => getOneflowEntities().then((data) => {
  const { entities } = data;
  return dispatch({ type: setIntegrationEntities, payload: entities });
});

export const changeEntityState = (id, state) => (dispatch) => changeIntegrationEntityState(id, state).then((data) => dispatch({ type: changeIntegrationEntity, payload: data.id }));
