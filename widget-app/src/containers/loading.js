import { connect } from 'react-redux';
import Loading from '../components/loading';

export default connect(
  state => ({
    state: state.loading.state,
  }),
  {},
)(Loading);
