import Cookies from "js-cookie";

export interface Teste {
  id: string;
  cursoId: string;
  candidaturaId: string;
  status: string;
  descricao: string | null;
  data: string | null;
  preco: number;
  contadorTeste: number;
  createdAt: string;
  updatedAt: string;
}

export interface CandidaturaTeste {
  id: string;
  status: string;
  idCandidato: string;
  idEdicao: string;
  idCurso: string;
  createdAt: string;
  updatedAt: string;
  testes: Teste[];
}

export const getTestesByCandidatura = async (): Promise<CandidaturaTeste[]> => {
  try {
    const token = Cookies.get("auth_token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const response = await fetch(
      "https://backend-promet.unitec.academy/candidaturas-testes-candidato",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Erro ao buscar testes da candidatura");

    const data: CandidaturaTeste[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
