import Drawer from '../component/Drawer';
import { connect } from 'react-redux';
import { Toggle_Menu } from '../module/reducer/reducer.components';

export default connect(
    (state) => ({
        menuState: state.component.showmenu,
        role: state.user.role,
        permission: state.user.permission
    }),
    (dispatch) => ({
        Toggle: () => dispatch(Toggle_Menu())
    })
)(Drawer)