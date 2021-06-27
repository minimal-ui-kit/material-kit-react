import { withStyles } from '@material-ui/styles';

// ----------------------------------------------------------------------

const GlobalStyles = withStyles((theme) => ({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    html: {
      width: '100%',
      height: '100%',
      '-ms-text-size-adjust': '100%',
      '-webkit-overflow-scrolling': 'touch'
    },
    body: {
      width: '100%',
      height: '100%'
    },
    '#root': {
      width: '100%',
      height: '100%'
    },
    input: {
      '&[type=number]': {
        MozAppearance: 'textfield',
        '&::-webkit-outer-spin-button': { margin: 0, WebkitAppearance: 'none' },
        '&::-webkit-inner-spin-button': { margin: 0, WebkitAppearance: 'none' }
      }
    },
    textarea: {
      '&::-webkit-input-placeholder': { color: theme.palette.text.disabled },
      '&::-moz-placeholder': { opacity: 1, color: theme.palette.text.disabled },
      '&:-ms-input-placeholder': { color: theme.palette.text.disabled },
      '&::placeholder': { color: theme.palette.text.disabled }
    },
    a: { color: theme.palette.primary.main },
    img: { display: 'block', maxWidth: '100%' }
  }
}))(() => null);

export default GlobalStyles;
