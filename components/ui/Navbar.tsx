import React, { useContext } from 'react'
import NextLink from 'next/link';

import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlineIcon from '@mui/icons-material/MenuOutlined'
import { UIContext } from '../../context/ui-context/UIContext';

export const Navbar = () => {

   const { openSideMenu } = useContext(UIContext)

   return (
      <AppBar position='sticky'>

         <Toolbar>

            <IconButton
               onClick={openSideMenu}
               size='large'
               edge='start'
            >
               <MenuOutlineIcon />
            </IconButton>

            <NextLink href="/" passHref>
               <Link underline="none" color="white" >
                  <Typography variant='h6' >Open Jira</Typography>
               </Link>
            </NextLink>

         </Toolbar>

      </AppBar>
   )
}
