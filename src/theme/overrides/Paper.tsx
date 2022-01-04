// ----------------------------------------------------------------------

export default function Paper(theme?: any) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  };
}
