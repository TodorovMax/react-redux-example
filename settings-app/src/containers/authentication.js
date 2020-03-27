import { connect } from 'react-redux';
import Authentication from '../components/authentication';
import { setUser } from '../action/authentication';
import { getSettings } from '../action/settings';
import { getEntities } from '../action/integration';
import { getCompatible } from '../action/info';

export default connect(
  (state) => ({
    user: state.authentication.user,
  }),
  {
    setUser,
    getSettings,
    getEntities,
    getCompatible,
  },
)(Authentication);
