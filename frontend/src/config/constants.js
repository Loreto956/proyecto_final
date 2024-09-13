// Obtener solo la dirección IP del host actual
const getHostIP = () => {
  const hostname = window.location.hostname;
  const ipRegex = /\d+\.\d+\.\d+\.\d+/;
  const match = hostname.match(ipRegex);
  return match ? match[0] : hostname;
}

export const URLBASE = `http://${getHostIP()}:3000` // ruta del backend usando solo IP
//export const URLBASE = 'http://165.22.160.27:3000' // ruta del backend

export const ENDPOINT = {
  login: `${URLBASE}/login`,
  users: `${URLBASE}/usuarios`,
  uproductos: `${URLBASE}/user-productos`,
  productos: `${URLBASE}/all-productos`,
  producto: `${URLBASE}/producto`,
  usuario: `${URLBASE}/usuario`,
  favoritos: `${URLBASE}/favoritos`,
  eliminarFavorito: `${URLBASE}/favoritos`,
  registerFavorite: `${URLBASE}/favoritos`,
  registrarProducto: `${URLBASE}/productos`,
  eliminarProducto: `${URLBASE}/productos`,
  actualizarProducto: `${URLBASE}/productos`,
}
