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
  productos: `${URLBASE}/productos`,
  producto: `${URLBASE}/producto`,
  usuario: `${URLBASE}/usuario`,
  favoritos: `${URLBASE}/favoritos`,
  eliminarFavorito: `${URLBASE}/favoritos`,
  registerFavorite: `${URLBASE}/favoritos`
}
