const styles = {
  global: (props) => ({
    '*': {
      boxSizing: 'border-box',
    },
    html: {
      minWidth: '360px',
      scrollBehavior: 'smooth',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    '#__next': {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      // background: mode('white', 'black')(props),
    },
    body: {
      fontFamily: 'body',
      // background: mode('white', 'black')(props),
      lineHeight: 'base',
    },
  }),
}

export default styles
