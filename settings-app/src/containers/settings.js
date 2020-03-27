import { connect } from 'react-redux';
import Settings from '../components/settings';
import { setToken } from '../action/settings';

export default connect(
  (state) => ({
    account: state.settings.account,
    reg: state.settings.reg,
    integration: state.common.integration,
  }),
  {
    setToken,
  },
)(Settings);
