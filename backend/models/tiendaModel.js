import pool from '../config/db.js';
import format from 'pg-format';


//Obtiene el usuario por email
const getUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al obtener usuario por email:', error.message);
        throw error; 

    }
};

const getUserById = async (usuario_id) => {
    try {
        const result = await pool.query('SELECT nombre, apellido FROM usuarios WHERE id = $1', [usuario_id]);
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error.message);
        throw error;
    }
}

// Crea un nuevo usuario
const createUser = async (nombre, apellido, email, password, direccion, telefono) => {
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, email, password, direccion, telefono, fecha_registro) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *',
            [nombre, apellido, email, password, direccion, telefono]
        );
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        throw error;
    }
};

// Crea un nuevo produto
const createProduct = async (nombre, marca, descripcion, precio, imagen, categoria, stock, usuario_id) => {
    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, marca, descripcion, precio, imagen, categoria, stock, fecha_creacion, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, $8) RETURNING *',
            [nombre, marca, descripcion, precio, imagen, categoria, stock, usuario_id] // Asignar el ID del usuario actual
        );
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al crear producto:', error.message);
        throw error; 
    }
};

// Elimina un producto
const eliminarProducto = async (producto_id, usuario_id) => {
    try {
        const result = await pool.query(
            'DELETE FROM productos WHERE id = $1 AND usuario_id = $2 RETURNING *',
            [producto_id, usuario_id]
        );
        if (result.rowCount > 0) {
            return { success: true, message: 'Producto eliminado con éxito.' };
        } else {
            return { success: false, message: 'No se pudo eliminar el producto o no pertenece al usuario.' };
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        throw error;
    }
};

// Actualiza un producto
const actualizarProducto = async (producto_id, usuario_id, datosActualizados) => {
    try {
        const { nombre, marca, descripcion, precio, imagen, categoria, stock } = datosActualizados;
        const result = await pool.query(
            'UPDATE productos SET nombre = $1, marca = $2, descripcion = $3, precio = $4, imagen = $5, categoria = $6, stock = $7 WHERE id = $8 AND usuario_id = $9 RETURNING *',
            [nombre, marca, descripcion, precio, imagen, categoria, stock, producto_id, usuario_id]
        );
        if (result.rowCount > 0) {
            return { success: true, producto: result.rows[0] };
        } else {
            return { success: false, message: 'No se pudo actualizar el producto o no pertenece al usuario.' };
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        throw error;
    }
};



const listarProduct = async ({ page = 1, limit = 9 }) => {
    try {
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 9;
        const offset = (pageNumber - 1) * limitNumber;

        const query = format(
            'SELECT * FROM productos ORDER BY fecha_creacion DESC LIMIT %s OFFSET %s',
            limitNumber,
            offset
        );
        const result = await pool.query(query);

        const totalQuery = 'SELECT COUNT(*) FROM productos';
        const totalResult = await pool.query(totalQuery);
        const totalCount = parseInt(totalResult.rows[0].count, 10);

        return {
            products: result.rows,
            page: pageNumber,
            limit: limitNumber,
            totalCount: totalCount
        };
    } catch (error) {
        console.error('Error al listar productos con paginación:', error.message);
        throw error;
    }
};


const detalleProductById = async (producto_id) => {
    try {
        const result = await pool.query(`
            SELECT p.*, u.nombre AS usuario_nombre, u.apellido AS usuario_apellido
            FROM productos p
            JOIN usuarios u ON p.usuario_id = u.id
            WHERE p.id = $1
        `, [producto_id]);
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return { success: false, message: 'No se encontró el producto.' };
        }
    } catch (error) {
        console.error('Error al obtener producto:', error.message);
        throw error; 
    }
};

// Lista los productos de un usuario
const listarProductByUser = async (usuario_id) => {
    try {
        const result = await pool.query('SELECT * FROM productos WHERE usuario_id = $1', [usuario_id]);
        if (result.rowCount > 0) {
            return result.rows;
        } else {
            return { success: false, message: 'No se encontraron productos para este usuario.' };
        }
    } catch (error) {
        console.error('Error al listar productos:', error.message);
        throw error; 
    }
};

// Agrega un producto a los favoritos de un usuario
const createFavorite = async (usuario_id, producto_id) => {
    try {
        const result = await pool.query(
            'INSERT INTO favoritos (usuario_id, producto_id, fecha_agregado) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *',
            [usuario_id, producto_id]
        );
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al crear favorito:', error.message);
        throw error; 
    }
};


// Lista los favoritos de un usuario
const listarFavoritos = async ( usuario_id ) => {
    try {
        const result = await pool.query('SELECT * FROM favoritos WHERE usuario_id = $1', [usuario_id]);
        if (result.rowCount > 0) {
            return result.rows;
        } else {
            return { success: false, message: 'No se encontraron favoritos para este usuario.' };
        }
    } catch (error) {
        console.error('Error al listar favoritos:', error.message);
        throw error; 
    }
};


// Elimina un favorito de un usuario
const borrarFavorito = async (producto_id, usuario_id) => {
    try {
        const result = await pool.query('DELETE FROM favoritos WHERE producto_id = $1 AND usuario_id = $2 RETURNING *', [producto_id, usuario_id]);
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al borrar favorito:', error.message);
        throw error; 
    }
};

export const model = {
    getUserByEmail,
    getUserById,
    createProduct,
    eliminarProducto,
    actualizarProducto,
    listarProduct,
    detalleProductById,
    listarProductByUser,
    createFavorite,
    listarFavoritos,
    borrarFavorito,
    createUser
}