import {
  setIntegrationEntities,
  changeIntegrationEntity,
} from '../constants/integration';

const initialState = {};

export const integration = (state = initialState, action) => {
  switch (action.type) {
    case setIntegrationEntities:
      return {
        ...state,
        entities: action.payload,
      };

    case changeIntegrationEntity:
      return {
        ...state,
        entities: state.entities.map((entity) => (entity.of_oneflowentityid === action.payload
          ? {
            ...entity,
            statuscode: entity.statuscode === 1 ? 2 : 1,
          }
          : entity)),
      };

    default:
      return state;
  }
};
