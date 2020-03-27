import { connect } from 'react-redux';
import ContractHandler from '../components/contract-handler';
import {
  handleContractHandler,
  createContract,
  getContractSelectors,
  getContactsData,
} from '../action/contract';

export default connect(
  state => ({
    contractHandlerState: state.contract.contractHandlerState,
    collections: state.contract.collections,
    templates: state.contract.templates,
    contacts: state.contract.contacts,
    opportunityProducts: state.contract.opportunityProducts,
    loader: state.loading.state,
  }),
  {
    handleContractHandler,
    createContract,
    getContractSelectors,
    getContactsData,
  },
)(ContractHandler);
