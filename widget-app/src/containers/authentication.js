import { connect } from 'react-redux';
import Authentication from '../components/authentication';
import { setUser, setWidgetState } from '../action/authentication';

export default connect(
  state => ({
    widgetState: state.authentication.widgetState,
  }),
  { setUser, setWidgetState },
)(Authentication);
