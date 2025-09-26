"use server";

import { cookies } from "next/headers";
import { routes } from "../config/routes";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function adicionarCertificado(file: File): Promise<ApiResponse<any>> {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) throw new Error("Erro de autenticação");

    const formData = new FormData();
    formData.append("file", file); // multipart, atributo = file

    const resp = await fetch(routes.Adicionarcertificado, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      throw new Error(errorText || "Falha ao enviar certificado");
    }

    const data = await resp.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Erro inesperado" };
  }
}
