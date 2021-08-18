import { connect } from 'react-redux';

import Header from '../component/Header';
import { Toggle_Menu } from '../module/reducer/reducer.components';

export default connect(
    (state) => ({
        menuState: state.component.showmenu
    }),
    (dispatch) => ({
        Toggle: () => dispatch(Toggle_Menu())
    })
)(Header)