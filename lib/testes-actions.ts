import Cookies from "js-cookie";

export interface Pagamento {
  id: string;
  candidatoId: string;
  edicaoId: string;
  itemNome: string;
  itemId: string;
  valor: number;
  desconto: number | null;
  metodoPagamento: string;
  referencia: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

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
  pagamentos?: Pagamento[];
}

export interface CandidaturaTeste {
  cursos: {
    id: string;
    nome: string;
    preco: number;
    precoTeste: number;
    descricao?: string | null;
    imgUrl?: string | null;
    desconto?: number | null;
    createdAt: string;
    updatedAt: string;
  };
  id: string;
  status: string;
  idCandidato: string;
  idEdicao: string;
  idCurso: string;
  createdAt: string;
  updatedAt: string;
  testesdiagnosticos: Teste[];
  pagamentos?: Pagamento[];

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

    // Garantir que cada candidatura tenha array de testes
    const formattedData = data.map((c) => ({
      ...c,
      testesdiagnosticos: c.testesdiagnosticos || [],
    }));

    return formattedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
