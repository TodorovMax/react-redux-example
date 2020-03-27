import { connect } from 'react-redux';
import Contract from '../components/contract';
import { getContract, handleContractHandler } from '../action/contract';

export default connect(
  state => ({
    user: state.authentication.user,
    contractState: state.contract.state,
    link: state.contract.link,
    status: state.contract.status,
    statusData: state.contract.statusData,
    participants: state.contract.participants,
  }),
  {
    getContract,
    handleContractHandler,
  },
)(Contract);
