// /lib/parceria-actions.ts
import Cookies from "js-cookie";

export interface ParceriaData {
  nomeEmpresa: string;
  local: string;
  ramoActividade: string;
  webSite: string;
  isDisponivelVagaEstagio: boolean;
  descricao: string;
  logoUrl?: string;
  responsavel: {
    nomeCompleto: string;
    email: string;
    telefone: string;
    whatsapp: string;
    cargo: string;
    idEmpresa?: string;
  };
}

export interface ParceriaResponse {
  id: string;
  nomeEmpresa: string;
  local: string;
  ramoActividade: string;
  webSite: string;
  isDisponivelVagaEstagio: boolean;
  descricao: string;
  logoUrl?: string;
  responsavel: {
    nomeCompleto: string;
    email: string;
    telefone: string;
    whatsapp: string;
    cargo: string;
    idEmpresa: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const criarParceria = async (data: ParceriaData): Promise<ParceriaResponse> => {
  try {
    const token = Cookies.get("auth_token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const response = await fetch("https://backend-promet.unitec.academy/empresa-parceira", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Obter mensagem de erro se estiver no corpo da resposta
      const erroTexto = await response.text();
      throw new Error(`Erro ao criar parceria: ${erroTexto}`);
    }

    const json = await response.json();
    return json as ParceriaResponse;
  } catch (err) {
    console.error("Erro em criarParceria:", err);
    throw err;
  }
};
