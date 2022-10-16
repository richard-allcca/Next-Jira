import React, { useContext } from 'react'

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlineIcon from '@mui/icons-material/MenuOutlined'
import { UIContext } from '../../context/ui-context/UIContext';

export const Navbar = () => {

   const { openSideMenu } = useContext(UIContext)

   return (
      <AppBar position='sticky'>
         <Toolbar>
            <IconButton onClick={openSideMenu} size='large' edge='start' >
               <MenuOutlineIcon />
            </IconButton>

            <Typography variant='h6' >Open Jira</Typography>
         </Toolbar>

      </AppBar>
   )
}
