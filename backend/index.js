import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import userRoutes from './routes/tiendaRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = process.env.PORT || 3000;


//Cors
app.use(cors());

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;