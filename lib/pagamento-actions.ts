"use server";
import { routes } from "../config/routes";
import { cookies } from "next/headers";

const API_URL = routes.backend_url;

export async function efectuarPagamento({
  metodoPagamento,
  itemId,
  itemNome,
  comprovativo,
  phoneNumber, // ✅ corrigi aqui
}: {
  metodoPagamento: string;
  itemId: string;
  itemNome: string;
  comprovativo?: File;
  phoneNumber?: string; // ✅ minúsculo
}) {
  try {
    const token = (await cookies()).get("auth_token")?.value;

    let res: Response;

    if (metodoPagamento === "transferencia" && comprovativo) {
      // fluxo transferência com comprovativo
      const formData = new FormData();
      formData.append("metodoPagamento", metodoPagamento);
      formData.append("itemId", itemId);
      formData.append("itemNome", itemNome);
      formData.append("comprovativo", comprovativo);

      res = await fetch(`${API_URL}/efectuar-pagamento`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    } else if (metodoPagamento === "mpesa" && phoneNumber) {
      // fluxo mpesa com número de telefone
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
          phoneNumber, // ✅ enviado corretamente
        }),
      });
    } else {
      // fallback genérico
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
        }),
      });
    }

    if (res.status === 200 || res.status === 201) {
      return { success: true, data: await res.json() };
    } else {
      const data = await res.json();
      throw new Error(data?.message || "Erro ao efectuar pagamento");
    }
  } catch (error: any) {
    console.error("Pagamento falhou:", error);
    return { success: false, error: error.message || "Erro no pagamento" };
  }
}
