'use server';

import { cookies } from "next/headers";
import { UserData } from "../components/user/types/user-types";
import { routes } from "../config/routes";



// Buscar usuário
export async function getUser(): Promise<UserData | undefined> {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const res = await fetch(routes.userprofile, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro na API getUser:", errorText);
      throw new Error(`Erro ao buscar usuário: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no getUser:", error);
    throw error;
  }
}

// Atualizar usuário
export async function updateUser(data: Partial<UserData>) {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const res = await fetch(routes.usereditprofile, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro na API updateUser:", errorText);
      throw new Error(`Erro ao atualizar usuário: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no updateUser:", error);
    throw error;
  }
}
