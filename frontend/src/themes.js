import { createMuiTheme } from '@material-ui/core/styles';

export const muiTheme = createMuiTheme({
  zIndex: {
    modal: 5500,
    snackbar: 5600,
    tooltip: 5700,
  },
  palette: {
    type: 'dark',
    primary: {
      light: '#7cc',
      main: '#0ff',
      dark: '#0cc',
      contrastText: '#101010',
    },
  },
});

const dark = {
  colors: {
    surface: {
      normal: {
        background: '#282c34',
        font: '#dad0d0',
      },
      disabled: {
        background: '#282c34',
        font: '#777',
      },
    },
    borders: '#dad0d0',
    grasp: {
      normal: {
        background: '#0f0',
        font: '#101010',
      },
      disabled: {
        background: '#050',
        font: '#777',
      },
    },
    vantage: {
      normal: {
        background: '#0ff',
        font: '#101010',
      },
      disabled: {
        background: '#055',
        font: '#777',
      },
    },
  },
  type: {
    normal: "'Barlow', sans-serif",
    mono: "'Roboto Mono', monospace",
    face: {
      normal: "'Barlow', sans-serif",
      mono: "'Roboto Mono', monospace",
    },
    height: {
      title: '2rem',
      heading: '1.5rem',
      label: '1.25rem',
      button: '1rem',
      detail: '0.8rem',
    },
  },
  borders: { radius: '3px' },
};

export default dark;
