import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      dark: '#222',
      light: '#222',
      main: '#222'
    },
    secondary: {
      main: '#47b27c',
      light: '#47b27c',
      dark: '#47b27c',
      contrastText: '#fff',
    },
  }
});