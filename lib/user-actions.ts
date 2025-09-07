export async function updateUser(data: any) {
  try {
    const res = await fetch("https://seu-backend.com/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao atualizar usuário");

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
