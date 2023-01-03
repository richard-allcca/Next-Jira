import React, { FC, PropsWithChildren } from 'react';
import Head from 'next/head'

import { Box } from '@mui/material'
import { Navbar, Sidebar } from '../ui';

interface Props extends PropsWithChildren {
   title?: string;
}

// NOTE - La propiedad "sx" sirve para personalizar los estilos ademas tiene acceso a las propiedades del tema

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
   )
}
