import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { EntriesProvider } from '../context/entries/';
import { UIProvider } from '../context/ui-context/';

import { darkTheme, lightTheme } from '../themes';

import '../styles/globals.css';


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
  );
}

export default MyApp;
