import { Candidatura } from './types';

export const candidaturasData: Candidatura[] = [
  {
    id: 1,
    curso: "Desenvolvimento Web Fullstack",
    edicao: "Turma 2023-2",
    status: "pendente",
    dataInscricao: "2023-10-15",
    dataAtualizacao: "2023-10-20",
    pagamentoTeste: "pendente",
    progresso: 0,
    valorTeste: 50.00
  },
  {
    id: 2,
    curso: "Gestão de Projetos Ágeis",
    edicao: "Turma 2023-3",
    status: "aprovada",
    dataInscricao: "2023-09-10",
    dataAtualizacao: "2023-09-25",
    pagamentoTeste: "pago",
    progresso: 100,
    valorTeste: 75.00
  },
  {
    id: 3,
    curso: "Data Science para Iniciantes",
    edicao: "Turma 2023-1",
    status: "rejeitada",
    dataInscricao: "2023-08-05",
    dataAtualizacao: "2023-08-20",
    pagamentoTeste: "isento",
    progresso: 100,
    valorTeste: 0
  },
  {
    id: 4,
    curso: "UX/UI Design Avançado",
    edicao: "Turma 2023-4",
    status: "em_analise",
    dataInscricao: "2023-11-01",
    dataAtualizacao: "2023-11-05",
    pagamentoTeste: "pendente",
    progresso: 25,
    valorTeste: 60.00
  }
];