import { connect } from 'react-redux';
import Header from '../components/header';
import {deleteContract} from '../action/header';

export default connect(
  state => ({
    user: state.authentication.user,
    contractState: state.contract.state,
  }),
  {deleteContract},
)(Header);
