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

// Obtener productos en venta
router.get('/productos', controller.getProducts);

// Entrega detalles de un producto
router.get('/producto/:producto_id', controller.getDetallesProductById);

// Entrega el Nombre y Apellido de un usuario segun el ID
router.get('/usuario/:usuario_id', controller.getUserName);



// Rutas protegidas

// Entrega los datos del usuario logeado 
router.get('/usuarios', controller.authenticateToken, controller.getUser);

// Registra un nuevo producto
router.post('/productos', controller.authenticateToken, controller.registerProduct);

// Elimina un producto del usuario logeado
router.delete('/productos/:producto_id', controller.authenticateToken, controller.eliminarProducto);

// Actualiza un producto del usuario logeado
router.put('/productos/:producto_id', controller.authenticateToken, controller.actualizarProducto);


// Agrega un producto a favoritos del usuario logeado
router.post('/favoritos', controller.authenticateToken, controller.registerFavorite); 

// Entrega los productos del usuario logeado
router.get('/productos/:usuario_id', controller.authenticateToken, controller.getProductByUser); 

// Entrega los favoritos del usuario logeado
router.get('/favoritos', controller.authenticateToken, controller.getFavoriteByUser); 

// Elimina un favorito del usuario logeado
router.delete('/favoritos/:product_id', controller.authenticateToken, controller.eliminarFavoritosById); 

// Manejo de rutas no encontradas
router.get('*', controller.notFound);

export default router 
