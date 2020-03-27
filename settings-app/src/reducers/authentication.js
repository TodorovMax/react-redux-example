import { SETUSER } from '../constants/authentication';

const initialState = {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case SETUSER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
