
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const LOCAL_SERVER = "http://192.168.43.177:5000";

export const routes = {
  googleLogin: `${API_BASE_URL}/auth/google`,
  backend_url: `${API_BASE_URL}`,
  register: `${API_BASE_URL}/auth/register`,
  userprofile: `${API_BASE_URL}/user-perfil`,
  usereditprofile: `${API_BASE_URL}/editar-perfil`,
  adicionarcandidato: `${API_BASE_URL}/adicionar-candidato`,
};
