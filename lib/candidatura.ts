"use server";

import { cookies } from "next/headers";

export type NovoCandidato = {
  provincia: string;
  morada: string;
  dataNascimento: string; // formato: YYYY-MM-DD
  numeroBi: string;
  nivelAcademico: string;
  contacto: string;
};

export async function adicionarCandidato(candidato: NovoCandidato) {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const res = await fetch(
      `https://backend-promet.unitec.academy/adicionar-candidato`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 👈 faltava isso
          Accept: "application/json", // 👈 bom incluir também
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(candidato),
      }
    );

    if (!res.ok) {
      throw new Error(`Erro ao adicionar candidato: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no adicionarCandidato:", error);
    throw error;
  }
}
