import { Button, Box, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import React, { useState, ChangeEvent, useContext } from 'react';

import { EntriesContext } from './../../context/entries/EntriesContext';
import { UIContext } from './../../context/ui-context/UIContext';
import { log } from 'console';

export const NewEntry = () => {

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, openAddingEntry, closeAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState('');
  const [touchedInput, setTouchedInput] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    setInputValue('');
    closeAddingEntry();
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {
        !isAddingEntry
          ? (
            <Button onClick={openAddingEntry}
              startIcon={<AddIcon />}
              fullWidth
              variant='outlined'
            >
              Agregar Tarea
            </Button>
          )
          : (
            <>
              <TextField
                fullWidth
                sx={{ marginTop: 2, maginBottom: 1 }}
                placeholder='Neva Entrada'
                autoFocus
                multiline
                label='Nueva Entrada'
                helperText={inputValue.length <= 0 && touchedInput && 'Ingrese un valor'}
                error={inputValue.length <= 0 && touchedInput}
                value={inputValue}
                onChange={onInputChange}
                onBlur={() => setTouchedInput(true)}
              >
              </TextField>

              <Box display={'flex'} justifyContent={'space-between'}>

                <Button onClick={closeAddingEntry} variant='text'>
                  Cancelar
                </Button>

                <Button onClick={onSave} variant='outlined' color='secondary' endIcon={<SaveIcon />}>
                  Guardar
                </Button>

              </Box>
            </>
          )
      }
    </Box>
  );
};
