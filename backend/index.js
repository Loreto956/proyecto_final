import express from 'express';
import cors from 'cors';
import userRoutes from './routes/tiendaRoutes.js';
import { setupDatabase } from './config/db.js';
const app = express();

const PORT = process.env.PORT || 3000;


//Cors
app.use(cors());

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/', userRoutes)


const startServer = async () => {
  try {
      // Realizar el setup de la base de datos
      await setupDatabase();

      // Iniciar el servidor en el puerto definido
      app.listen(PORT, () => {
          console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });
  } catch (error) {
      console.error('Error al iniciar el servidor:', error.message);
      process.exit(1);
  }
};
startServer()

export default app;