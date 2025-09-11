"use server";

import { cookies } from "next/headers";
import { routes } from "../config/routes";

export type User = {
  id: string;
  nome: string;
  apelido: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Formacao = {
  id: string;
  idCandidato: string;
  local: string;
  nome: string;
  descricao: string;
  duracao: string | null;
  dataInicio: string;
  dataFim: string;
  createdAt: string;
  updatedAt: string;
};

export type Experiencia = {
  id: string;
  organizacao: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
  createdAt: string;
  updatedAt: string;
  idCandidato: string;
};

export type Candidato = {
  id: string;
  idUser: string;
  provincia: string;
  morada: string;
  dataNascimento: string;
  numeroBi: string;
  nivelAcademico: string;
  contacto: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
  formacoes: Formacao[];
  experiencias: Experiencia[];
};

export async function getCandidato(): Promise<Candidato | null> {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    console.error("Token não encontrado nos cookies.");
    return null;
  }

  try {
    const res = await fetch(routes.candidato, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error("Erro ao buscar candidato:", res.statusText);
      return null;
    }

    const data: Candidato = await res.json();
    return data;
  } catch (error) {
    console.error("Erro no fetch candidato:", error);
    return null;
  }
}
