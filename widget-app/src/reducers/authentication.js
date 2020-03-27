import { SETUSER, SETWIDGETSTATUS } from '../constants/authentication';

const initialState = {
  user: false,
  widgetState: false,
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case SETUSER:
      return {
        ...state,
        user: action.payload,
      };

    case SETWIDGETSTATUS:
      return {
        ...state,
        widgetState: action.payload,
      };

    default:
      return state;
  }
};
