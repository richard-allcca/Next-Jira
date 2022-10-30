import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack';

import { UIProvider } from '../context/ui-context/';
import { EntriesProvider } from '../context/entries/EntriesProvider';

import { darkTheme, lightTheme } from '../themes'


function MyApp({ Component, pageProps }: AppProps) {
   return (
      <SnackbarProvider>

         <EntriesProvider>

            <UIProvider>

               <ThemeProvider theme={darkTheme}>

                  <CssBaseline />
                  <Component {...pageProps} />

               </ThemeProvider>

            </UIProvider>

         </EntriesProvider>

      </SnackbarProvider>
   )
}

export default MyApp
