import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';

import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from '../../components/layouts';

import { Entry, EntryStatus } from '../../interfaces';
import { GetServerSideProps } from 'next';
import { isValidObjectId } from 'mongoose';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { getFormatDistaceToNow } from '../../utils';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];


// REVIEW - RadioGroup en horizontal con "row" en true 
// REVIEW - capitalizar las palabras con "capitalize" ejemplo en validStatus.map()

interface Props {
   entryDb: Entry;
}

const EntryPage: FC<Props> = ({ entryDb }) => {

   const { changeStateEntry } = useContext(EntriesContext)

   const [inputValue, setInputValue] = useState(entryDb.description)
   const [status, setStatus] = useState<EntryStatus>(entryDb.status)
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
      if (inputValue.trim().length === 0) return;

      const updateEntry: Entry = {
         ...entryDb,
         status,//el status de la entry en db se reemplaza por el status modificado aquí
         description: inputValue
      }

      changeStateEntry(updateEntry, true);
   }

   return (
      <Layout title={inputValue.substring(0, 20) + '... '} >
         <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
         >

            <Grid item xs={12} sm={8} md={6} >
               <Card>
                  <CardHeader
                     title={`Entrada: `}
                     subheader={`Creado ${getFormatDistaceToNow(entryDb.createAt)}`}
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

      </Layout >
   )
}

// NOTE - You should use getServerSideProps when:
// cuando la pagina debe ser construida con una petición del usuario(no una petición si no un request en el servido)
export const getServerSideProps: GetServerSideProps = async (ctx) => {
   // const {data} = await 
   const { id } = ctx.params as { id: string };

   const entryDb = await dbEntries.getEntryById(id);

   if (!isValidObjectId(id)) {
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }

   return {
      props: {
         entryDb
      }
   }
}

export default EntryPage;