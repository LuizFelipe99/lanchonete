//variavies ambiente

const host = window.location.hostname; // pegando o hostname da url do navegador
//se for local direciona para rota local caso contrario vai para o servidor
export const BASE_URL = (host.includes('localhost') || host.includes('127.0.0.1')) ? 'http://127.0.0.1/api/lanchonete/' 
  : 'https://gym-dev.com/lanchonete/';

