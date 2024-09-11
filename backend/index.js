import express from 'express';
import cors from 'cors';
import userRoutes from './routes/tiendaRoutes.js';
const app = express();

const PORT = process.env.PORT || 3000;


//Cors
app.use(cors());

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;