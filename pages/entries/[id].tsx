import { useState, ChangeEvent, useMemo } from 'react';

import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from '../../components/layouts';

import { EntryStatus } from '../../interfaces';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];


// REVIEW - RadioGroup en horizontal con "row" en true 
// REVIEW - capitalizar las palabras con "capitalize" ejemplo en validStatus.map()

const EntryPage = () => {

   const [inputValue, setInputValue] = useState('')
   const [status, setStatus] = useState<EntryStatus>('pending')
   const [touched, setTouched] = useState(false)

   const isValidInput = useMemo(() => inputValue.length <= 0, [inputValue, touched])

   const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
   }

   const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
      console.log(event.target)
      setStatus(event.target.value as EntryStatus)
   }

   const onSave = () => {
      console.log({ inputValue, status })
   }

   return (
      <Layout title='....' >
         <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
         >

            <Grid item xs={12} sm={8} md={6} >
               <Card>
                  <CardHeader
                     title={`Entrada: ${inputValue}`}
                     subheader={`Creada hace:.... minutos`}
                  />

                  <CardContent>
                     <TextField
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        fullWidth
                        placeholder="Nueva entrada"
                        autoFocus
                        multiline
                        label="Nueva entrada"
                        value={inputValue}
                        onBlur={() => setTouched(true)}
                        onChange={onInputValueChange}
                        helperText={isValidInput && 'Ingrese un valor '}
                        error={isValidInput}
                     />

                     <FormControl>
                        <FormLabel>Estado:</FormLabel>
                        <RadioGroup row
                           value={status}
                           onChange={onStatusChanged}
                        >
                           {
                              validStatus.map(option => {
                                 return <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={capitalize(option)}
                                 />
                              })
                           }

                        </RadioGroup>
                     </FormControl>

                  </CardContent>

                  <CardActions>
                     <Button
                        startIcon={<SaveOutlinedIcon />}
                        variant="contained"
                        fullWidth
                        onClick={onSave}
                        disabled={inputValue.length == 0}
                     >

                     </Button>
                  </CardActions>

               </Card>
            </Grid>

         </Grid>

         <IconButton sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark'
         }} >
            <DeleteOutlinedIcon />
         </IconButton>

      </Layout>
   )
}

export default EntryPage;