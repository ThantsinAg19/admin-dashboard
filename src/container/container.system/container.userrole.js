import { Role } from '../../pages/system';
import { connect } from 'react-redux';

export default connect(
    (state) => ({
        isLoading: state.system.isLoading,
        errorMessage: state.system.errorMessage,
        roles: state.system.user_roles,
    }),
    null
)(Role)