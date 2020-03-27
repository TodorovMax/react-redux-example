import { connect } from 'react-redux';
import SidebarInfo from '../../components/sidebar/components/sidebar-info';

export default connect(
  (state) => ({
    integration: state.common.integration,
    compatible: state.info.compatible,
    errors: state.info.errors,
  }),
  null,
)(SidebarInfo);
