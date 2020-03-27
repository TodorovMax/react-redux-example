import { setCompatible, setInfoSidebarError } from '../constants/info';

const initialState = {
  compatible: false,
  errors: {},
};

export const info = (state = initialState, action) => {
  switch (action.type) {
    case setCompatible:
      return {
        ...state,
        compatible: action.payload,
      };

    case setInfoSidebarError:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
