import mongoose from 'mongoose';
/** status propios de mongoose
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0
};

export const connect = async () => {

  if (mongoConnection.isConnected) {
    console.log('Ya estabamos conectados');
    return;
  }

  if (mongoose.connections.length > 0) {

    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log('Usando conexión anterior');
      return;
    }

    console.log('nunca llega aqui');
    await mongoose.disconnect();
  }

  try {

    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConnection.isConnected = 1;
    console.log('Conectado a MongoDb:', process.env.MONGO_URL);

  } catch (error) {
    console.log(error);
  }
};


export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return; // check if it is in development (node)

  if (mongoConnection.isConnected === 0) return; // check mongo disconnection

  console.log('Desconectado de MongoDb');
  await mongoose.disconnect();
  // mongoConnection.isConnected = 0;
};