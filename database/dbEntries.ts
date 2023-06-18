
import { isValidObjectId } from 'mongoose';
import { db } from '.';
import EntryModel, { IEntry } from './../models/Entry';


// NOTE - "lean" es usado cuando solo necesitamos información precisa de una consulta

export const getEntryById = async (id: string): Promise<IEntry | null> => {

  if (!isValidObjectId(id)) return null;

  await db.connect();
  const entry = await EntryModel.findById(id).lean();
  await db.disconnect();

  // method for serialize mongo_id
  return JSON.parse(JSON.stringify(entry));
};