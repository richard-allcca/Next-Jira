import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react'

const menuItems: string[] = ['Inbox', 'Started', 'Send Emnail', 'Draft']

export const Sidebar = () => {
   return (
      <Drawer anchor='left' open={true} onClose={() => console.log('cerrando  ')}>

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
