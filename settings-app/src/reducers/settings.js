import { setSettingsAccount, setSettingsReg } from '../constants/settings';

const initialState = {};

export const settings = (state = initialState, action) => {
  switch (action.type) {
    case setSettingsAccount:
      return {
        ...state,
        account: action.payload,
      };

    case setSettingsReg:
      return {
        ...state,
        reg: action.payload,
      };

    default:
      return state;
  }
};
