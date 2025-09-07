export async function addFormacao(data: any) {
  try {
    const res = await fetch("https://seu-backend.com/api/formacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao adicionar formação");

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function updateFormacao(id: number, data: any) {
  try {
    const res = await fetch(`https://seu-backend.com/api/formacao/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao atualizar formação");

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
