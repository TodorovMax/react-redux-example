import { setIntegrationState } from '../constants/common';

const initialState = {};

export const common = (state = initialState, action) => {
  switch (action.type) {
    case setIntegrationState:
      return {
        ...state,
        integration: action.payload,
      };

    default:
      return state;
  }
};
