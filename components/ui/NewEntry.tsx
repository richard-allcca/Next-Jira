import React from 'react'
import { Button, Box, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

export const NewEntry = () => {
   return (
      <Box sx={{ marginBottom: 2, paddingX: 1 }}>

         <Button
            startIcon={<AddIcon />}
            fullWidth
            variant='outlined'
         >
            Agregar Tarea
         </Button>

         <TextField
            fullWidth
            sx={{ marginTop: 2, maginBottom: 1 }}
            placeholder='Neva Entrada'
            autoFocus
            multiline
            label='Nueva Entrada'
            helperText='Ingrese un valor'
         >

         </TextField>

         <Box display={'flex'} justifyContent={'space-between'}>

            <Button variant='text'>
               Cancelar
            </Button>

            <Button variant='outlined' color='secondary' endIcon={<SaveIcon />}>
               Guardar
            </Button>

         </Box>
      </Box>
   )
}
