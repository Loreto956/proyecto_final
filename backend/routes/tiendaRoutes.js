import express from 'express';
import { controller } from '../controllers/tiendaController.js';
import { middleware } from '../middleware/tiendaMiddleware.js';

const router = express.Router();
// Rutas publicas
router.get('/', controller.home);

// Rutas para registrar un nuevo usuario
router.post('/usuarios', controller.registerUser);

// Rutas para iniciar sesión 
router.post('/login', controller.loginUser);


// Rutas protegidas

// Obtener productos en venta
router.get('/productos', middleware.authenticateToken, controller.getProducts); 

// Entrega detalles de un producto
router.get('/producto/:producto_id', middleware.authenticateToken, controller.getDetallesProductById); 


// Entrega el Nombre y Apellido de un usuario segun el ID
router.get('/usuario/:usuario_id', middleware.authenticateToken, controller.getUserName);  


// Entrega los datos del usuario logeado 
router.get('/usuarios', middleware.authenticateToken, controller.getUser);

// Registra un nuevo producto
router.post('/productos', middleware.authenticateToken, controller.registerProduct);

// Elimina un producto del usuario logeado
router.delete('/productos/:producto_id', middleware.authenticateToken, controller.eliminarProducto);

// Actualiza un producto del usuario logeado
router.put('/productos/:producto_id', middleware.authenticateToken, controller.actualizarProducto);


// Agrega un producto a favoritos del usuario logeado
router.post('/favoritos', middleware.authenticateToken, controller.registerFavorite); 

// Entrega los productos del usuario logeado
router.get('/productos/:usuario_id', middleware.authenticateToken, controller.getProductByUser); 

// Entrega los favoritos del usuario logeado
router.get('/favoritos', middleware.authenticateToken, controller.getFavoriteByUser); 

// Elimina un favorito del usuario logeado
router.delete('/favoritos/:product_id', middleware.authenticateToken, controller.eliminarFavoritosById); 

// Manejo de rutas no encontradas
router.get('*', controller.notFound);

export default router 
