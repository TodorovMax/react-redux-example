import {
  SETCONTRACT,
  SETCONTRACTLINK,
  SETCONTRACTSTATUS,
  SETCONTRACTHANDLERSTATE,
  SETCONTRACTCOLLECTIONS,
  SETCONTRACTTEMPLATES,
  SETCONTRACTCONTACTS,
  SETSTATUSDATA,
  SETPARTICIPANTS,
  SETOPPORTUNITYPRODUCTS,
} from '../constants/contract';

const initialState = {
  state: false,
  link: false,
  status: false,
  statusData: {},
  participants: [],
  contractHandlerState: false,
  collections: [],
  templates: [],
  contacts: [],
  opportunityProducts: [],
};

export const contract = (state = initialState, action) => {
  switch (action.type) {
    case SETCONTRACT:
      return {
        ...state,
        state: action.payload,
      };
    case SETCONTRACTLINK:
      return {
        ...state,
        link: action.payload,
      };
    case SETCONTRACTSTATUS:
      return {
        ...state,
        status: action.payload,
      };

    case SETCONTRACTHANDLERSTATE:
      return {
        ...state,
        contractHandlerState: action.payload,
      };

    case SETCONTRACTCOLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };

    case SETCONTRACTTEMPLATES:
      return {
        ...state,
        templates: action.payload,
      };

    case SETCONTRACTCONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };

    case SETSTATUSDATA:
      return {
        ...state,
        statusData: action.payload,
      };

    case SETPARTICIPANTS:
      return {
        ...state,
        participants: action.payload,
      };

    case SETOPPORTUNITYPRODUCTS:
      return {
        ...state,
        opportunityProducts: action.payload,
      };

    default:
      return state;
  }
};
