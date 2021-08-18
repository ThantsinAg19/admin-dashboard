import { red } from '@material-ui/core/colors';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

    palette: {
        primary: {
            main: '#FE7D5A',
            contrastText: '#fff'
        },
        secondary: {
            main: '#009688'
        },
        error: {
            main: red[600],
            dark: red[800]
        },
        background: {
            default: '#fff'
        },
        info: {
            main: '#363838'
        }
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        fontSize: 14,
    },
})

export default theme