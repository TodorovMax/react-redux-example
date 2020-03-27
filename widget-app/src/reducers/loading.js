import { SETLOADING } from '../constants/loading';

const initialState = {
  state: true,
};

export const loading = (state = initialState, action) => {
  switch (action.type) {
    case SETLOADING:
      return {
        ...state,
        state: action.payload,
      };

    default:
      return state;
  }
};
