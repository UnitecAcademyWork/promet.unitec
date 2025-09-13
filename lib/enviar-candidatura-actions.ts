// /lib/enviar-candidatura-actions.ts
import Cookies from "js-cookie";
import { routes } from "../config/routes";
import toast from "react-hot-toast";

export interface CandidaturaData {
  idCurso: string;
}

export const enviarCandidatura = async (data: CandidaturaData) => {
  const token = Cookies.get("auth_token");
  if (!token) throw new Error("Token de autenticação não encontrado");

  const response = await fetch(routes.candidatura, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
  if (result?.message === "Utilizador não encontrado") {
    toast.error("Preencha os dados do seu perfil para candidatar-se.");
    return; // <- evita lançar de novo
  }
  toast.error(result?.message || "Erro ao enviar candidatura");
  return;
}


  return result;
};
