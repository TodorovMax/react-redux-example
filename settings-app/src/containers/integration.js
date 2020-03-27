import { connect } from 'react-redux';
import Integration from '../components/integration';
import { changeEntityState } from '../action/integration';

export default connect(
  (state) => ({
    entities: state.integration.entities,
  }),
  {
    changeEntityState,
  },
)(Integration);
