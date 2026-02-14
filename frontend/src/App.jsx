import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import { createRTLCache } from './theme/rtl'
import { theme } from './theme'
import { router } from './router';

const catchRTL = createRTLCache();

function App() {

  return (
    <CacheProvider value={catchRTL}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
