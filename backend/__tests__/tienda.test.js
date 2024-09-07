import request from 'supertest';
import app from '../index.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

describe('Pruebas de la API de la tienda', () => {
  it('Debería obtener una lista de productos', async () => {
    const respuesta = await request(app).get('/productos');
    
    expect(respuesta.status).toBe(200);
    expect(Array.isArray(respuesta.body)).toBe(true);
    expect(respuesta.body.length).toBeGreaterThan(0);
    
    const primerProducto = respuesta.body[0];
    expect(primerProducto).toEqual(expect.objectContaining({
      id: expect.any(Number),
      nombre: expect.any(String),
      marca: expect.any(String),
      descripcion: expect.any(String),
      precio: expect.any(String),
      imagen: expect.any(String),
      categoria: expect.any(String),
      stock: expect.any(Number),
      fecha_creacion: expect.any(String),
      usuario_id: expect.any(Number)
    }));

    expect(new Date(primerProducto.fecha_creacion)).toBeInstanceOf(Date);
  });


  it('Debería realizar login y devolver un token', async () => {
    const credenciales = {
      email: "matias@gmail.com",
      password: "12345"
    };

    const respuesta = await request(app)
      .post('/login')
      .send(credenciales);

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveProperty('token');

    // Verificar que el token sea válido
    const token = respuesta.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    expect(decodedToken).toHaveProperty('id');
    expect(decodedToken).toHaveProperty('email', credenciales.email);
  });

  it('Debería crear un nuevo producto', async () => {
    const nuevoProducto = {
      nombre: "Producto de prueba",
      marca: "Marca de prueba",
      descripcion: "Descripción del producto de prueba",
      precio: "15000.00",
      imagen: "https://ejemplo.com/imagen.jpg",
      categoria: "Categoría de prueba",
      stock: 10
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJtYXRpYXNAZ21haWwuY29tIiwiaWF0IjoxNzI1NjgxMzgyLCJleHAiOjE3MjU2ODQ5ODJ9.2plQpl1mjR4uAudWAAuyzXx3hAbjKi6BH4kt2kmRXaM"
    const respuesta = await request(app)
      .post('/productos')
      .set('Authorization', `Bearer ${token}`)
      .send(nuevoProducto);

    expect(respuesta.status).toBe(201);
    expect(respuesta.body).toHaveProperty('id');
    expect(respuesta.body).toMatchObject({
      nombre: nuevoProducto.nombre,
      marca: nuevoProducto.marca,
      descripcion: nuevoProducto.descripcion,
      precio: nuevoProducto.precio,
      imagen: nuevoProducto.imagen,
      categoria: nuevoProducto.categoria,
      stock: nuevoProducto.stock,
      usuario_id: 8 // Este es el ID del usuario según el token
    });
    expect(respuesta.body).toHaveProperty('fecha_creacion');
  });

  it('Debería obtener los productos del usuario autenticado', async () => {
    // Decodificar el token para obtener el ID del usuario
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJtYXRpYXNAZ21haWwuY29tIiwiaWF0IjoxNzI1NjgxMzgyLCJleHAiOjE3MjU2ODQ5ODJ9.2plQpl1mjR4uAudWAAuyzXx3hAbjKi6BH4kt2kmRXaM"
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const respuesta = await request(app)
      .get(`/productos/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(respuesta.status).toBe(200);
    expect(Array.isArray(respuesta.body)).toBe(true);
    
    // Verificar que todos los productos pertenecen al usuario correcto
    respuesta.body.forEach(producto => {
      expect(producto).toHaveProperty('usuario_id', userId);
      expect(producto).toHaveProperty('id');
      expect(producto).toHaveProperty('nombre');
      expect(producto).toHaveProperty('marca');
      expect(producto).toHaveProperty('descripcion');
      expect(producto).toHaveProperty('precio');
      expect(producto).toHaveProperty('imagen');
      expect(producto).toHaveProperty('categoria');
      expect(producto).toHaveProperty('stock');
      expect(producto).toHaveProperty('fecha_creacion');
    });

    // Verificar que al menos un producto fue devuelto
    expect(respuesta.body.length).toBeGreaterThan(0);
  });
});