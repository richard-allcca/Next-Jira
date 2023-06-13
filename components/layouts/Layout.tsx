import React, { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import { Box } from '@mui/material';
import { Navbar, Sidebar } from '../ui';

interface Props extends PropsWithChildren {
  title?: string;
}

// NOTE
// La propiedad "sx=" es igual a "style=" ademas tiene acceso al theme

export const Layout: FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{ flexFlow: 1 }} >

      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />

      <Sidebar />

      <Box sx={{ padding: '10px 20px' }} >
        {children}
      </Box>

    </Box>
  );
};
