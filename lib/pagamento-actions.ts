"use server";
import { routes } from "../config/routes";
import { cookies } from "next/headers";

const API_URL = routes.backend_url;

export async function efectuarPagamento({
  metodoPagamento,
  itemId,
  itemNome,
  idEdicao,
  comprovativo,
}: {
  metodoPagamento: string;
  itemId: string;
  itemNome: string;
  idEdicao: string;
  comprovativo?: File;
}) {
  try {
    const token = (await cookies()).get("auth_token")?.value;

    let res: Response;

    if (metodoPagamento === "transferencia" && comprovativo) {
      const formData = new FormData();
      formData.append("metodoPagamento", metodoPagamento);
      formData.append("itemId", itemId);
      formData.append("itemNome", itemNome);
      formData.append("idEdicao", idEdicao);
      formData.append("comprovativo", comprovativo);

      res = await fetch(`${API_URL}/efectuar-pagamento`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    } else {
      res = await fetch(`${API_URL}/efectuar-pagamento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          metodoPagamento,
          itemId,
          itemNome,
          idEdicao,
        }),
      });
    }

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.message || "Erro ao efectuar pagamento");
    }

    return await res.json();
  } catch (error: any) {
    console.error("Pagamento falhou:", error);
    return { success: false, error: error.message || "Erro no pagamento" };
  }
}
