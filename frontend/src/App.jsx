import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import { GlobalContextProvider } from './context/GlobalContext'
import { createRTLCache } from './theme/rtl'
import { theme } from './theme'
import { router } from './router';

const catchRTL = createRTLCache();

function App() {

  return (
    <CacheProvider value={catchRTL}>
      <ThemeProvider theme={theme}>
        <GlobalContextProvider>
          <RouterProvider router={router} />
        </GlobalContextProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
