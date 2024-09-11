import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,  // Incluye el nombre de la base de datos aquí
    allowExitOnIdle: true
};

const pool = new Pool(config);

const setupDatabase = async () => {
    try {
        // Crear las tablas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                apellido VARCHAR(255) NOT NULL,
                direccion VARCHAR(255),
                telefono VARCHAR(20),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS productos (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                marca VARCHAR(255),
                descripcion TEXT NOT NULL,
                precio DECIMAL(10,2) NOT NULL,
                imagen VARCHAR(255),
                categoria VARCHAR(255) NOT NULL,
                stock INTEGER NOT NULL,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                usuario_id INTEGER REFERENCES usuarios(id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS favoritos (
                id SERIAL PRIMARY KEY,
                usuario_id INTEGER REFERENCES usuarios(id),
                producto_id INTEGER REFERENCES productos(id),
                fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insertar datos
        await pool.query(`
            INSERT INTO usuarios (id, nombre, apellido, direccion, telefono, email, password, fecha_registro) VALUES
            (1, 'Francisco', 'Labbe', 'Brasil 431', '987296798', 'fcolabbe@gmail.com', '$2a$10$PCl59cQRROlfZtyPk/xTZezV0bT4gC9zFaA.mbX6g6N7XaAqEMB2a', '2024-09-03'),
            (2, 'Juana', 'Salas', '123 Calle Falsa, Ciudad Ficticia', '555-1234', 'juana.salas@example.com', '$2a$10$PCl59cQRROlfZtyPk/xTZezV0bT4gC9zFaA.mbX6g6N7XaAqEMB2a', '2024-01-15'),
            (3, 'Juan', 'Pérez', '456 Avenida Verdadera, Pueblo Imaginario', '555-5678', 'juan.perez@example.com', '$2a$10$PCl59cQRROlfZtyPk/xTZezV0bT4gC9zFaA.mbX6g6N7XaAqEMB2a', '2024-02-10'),
            (4, 'Maria', 'Rodriguez', '789 Camino Real, Villa Inventada', '555-9876', 'maria.rodriguez@example.com', '$2a$10$PCl59cQRROlfZtyPk/xTZezV0bT4gC9zFaA.mbX6g6N7XaAqEMB2a', '2024-03-25');
        `);

        await pool.query(`
            INSERT INTO productos (nombre, marca, descripcion, precio, imagen, categoria, stock, usuario_id) VALUES
            ('Juguete para perro', 'Joy', 'Un juguete divertido para tu perro.', 10000.00, 'https://m.media-amazon.com/images/I/61ixT5DxpDL.jpg', 'Perro', 5, 1),
            ('Comida para gato', 'Nomade', 'Comida saludable para tu gato.', 5000.00, 'https://www.nomadepet.cl/wp-content/uploads/2022/12/NOMADE_gatos_v2.png', 'Gato', 10, 2),
            ('Collar luminoso', 'LuzPet', 'Collar seguro y visible para paseos nocturnos.', 8000.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwO3ijQfo0tUfT8Zhno18dAqK3bXhqj8z3A&s', 'Perro', 15, 3),
            ('Comida para perro', 'Dog Buffet', 'Comida balanceada y nutritiva para mantener a tu perro saludable.', 5500.00, 'https://cdnx.jumpseller.com/la-mascota/image/29402837/Dog_Buffet_25.png?1668298231', 'Perro', 20, 2),
            ('Cama para gato', 'CatComfort', 'Cama suave y acolchada para que tu gato duerma cómodamente.', 3200.00, 'https://cdnx.jumpseller.com/guaudor/image/43729687/resize/640/640?1702997744', 'Gato', 12, 2),
            ('Collar para perro', 'PawsStyle', 'Collar ajustable y resistente con diseño moderno para tu perro.', 1000.00, 'https://www.petclick.cl/694-large_default/collar-bandana.jpg', 'Perro', 25, 2),
            ('Rascador para gato', 'ScratchKing', 'Rascador vertical para que tu gato afile sus garras y se divierta.', 2500.00, 'https://static.miscota.com/media/1/photos/products/028412/rascador-para-gato-bella-gris-29-x-29-x-39-cm-4016598346129-1-2_3_g.jpg', 'Gato', 15, 2),
            ('Snacks para gato', 'TChuru', 'Deliciosos snacks para recompensar a tu gato.', 1600.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQytoM0YtcUYfxlIZ3ZA-qcJ1TUVtMMoSogFA&s', 'Gato', 30, 2),
            ('Juguete interactivo para perro', 'PlayPaws', 'Juguete que estimula la mente de tu perro y lo mantiene entretenido.', 2000.00, 'https://www.retail.cl/cdn/shop/files/1_acf14375-337f-4394-b92b-84d1785e9594.jpg?v=1692212059', 'Perro', 18, 2),
            ('Arenero para gato', 'CatLitterBox', 'Arenero fácil de limpiar y con diseño ergonómico para tu gato.', 1800.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgdmzi8W2XBf3y2tEFbEycrLXXYnuTqmRBsg&s', 'Gato', 14, 2);
        `);

        await pool.query(`
            INSERT INTO favoritos (usuario_id, producto_id, fecha_agregado) VALUES
            (1, 1, '2024-05-01'),
            (1, 2, '2024-05-02'),
            (2, 3, '2024-06-10'),
            (3, 4, '2024-07-15'),
            (3, 5, '2024-07-20');
        `);

        console.log('Setup de base de datos completado');

        await pool.query('SELECT now()');
        console.log('Connected to PostgreSQL server');
    } catch (error) {
        console.error('Error en la configuración de la base de datos:', error);
    }
};

export default pool;
export { setupDatabase };
