import React, { useContext } from 'react'

import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { UIContext } from './../../context/ui-context';

const menuItems: string[] = ['Inbox', 'Started', 'Send Emnail', 'Draft']

export const Sidebar = () => {

   const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

   return (
      <Drawer anchor='left' open={sidemenuOpen} onClose={closeSideMenu}>

         <Box sx={{ padding: '5px 10px' }}>
            <Typography>Menú</Typography>
         </Box>

         <List>
            {
               menuItems.map((item, i) => (
                  <ListItem button key={item}>
                     <ListItemIcon>
                        {i % 2 ? 'item 1' : 'item 2'}
                     </ListItemIcon>

                     <ListItemText primary={item}>
                     </ListItemText>
                  </ListItem>
               ))
            }
         </List>

      </Drawer>
   )
}
