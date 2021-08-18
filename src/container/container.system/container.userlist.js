import { User } from '../../pages/system';
import { connect } from 'react-redux';

/**
 * user list in system tabs
 */
export default connect(
    (state) => ({
        isLoading: state.system.isLoading,
        errorMessage: state.system.errorMessage,
        userlist: state.system.user_list,

        /**
         * option
         */
        roles: state.option.user_role_list,
        branch: state.option.branch_list,
    }),
    null
)(User);