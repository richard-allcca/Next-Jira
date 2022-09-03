import React from 'react'

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlineIcon from '@mui/icons-material/MenuOutlined'

export const Navbar = () => {
   return (
      <AppBar position='sticky'>
         <Toolbar>
            <IconButton size='large' edge='start' >
               <MenuOutlineIcon />
            </IconButton>

            <Typography variant='h6' >Open Jira</Typography>
         </Toolbar>

      </AppBar>
   )
}
