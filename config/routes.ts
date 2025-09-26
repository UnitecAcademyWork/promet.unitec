
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const LOCAL_SERVER = "http://192.168.43.177:5000";

export const routes = {
  googleLogin: `${API_BASE_URL}/auth/google`,
  backend_url: `${API_BASE_URL}`,
  register: `${API_BASE_URL}/auth/register`,
  newpassword: `${API_BASE_URL}/auth/reset-password`,
  login: `${API_BASE_URL}/auth/login`,
  authresendotp: `${API_BASE_URL}/auth/resend-otp`,
  forgotpassword: `${API_BASE_URL}/auth/forgot-password`,
  userprofile: `${API_BASE_URL}/user-perfil`,
  usereditprofile: `${API_BASE_URL}/editar-perfil`,
  adicionarcandidato: `${API_BASE_URL}/adicionar-candidato`,
  candidato: `${API_BASE_URL}/candidato`,
  cursos: `${API_BASE_URL}/cursos`,
  adicionarformacao: `${API_BASE_URL}/adicionar-formacao`,
  experiencias: `${API_BASE_URL}/experiencias-candidato`,
  formacoescandidato: `${API_BASE_URL}/formacoes-candidato`,
  actualizarformacao: `${API_BASE_URL}/actualizar-formacao`,
  addexperienciaprofissional: `${API_BASE_URL}/add-experiencia-profissional`,
  candidaturascandidato: `${API_BASE_URL}/candidaturas-candidato`,
  candidatura: `${API_BASE_URL}/candidatura`,
  Adicionarcertificado: `${API_BASE_URL}/adicionar-certificado`,
};
