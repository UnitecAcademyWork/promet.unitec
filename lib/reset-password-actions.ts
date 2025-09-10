"use server";

export async function forgotPassword(email: string) {
  try {
    const res = await fetch("https://backend-promet.unitec.academy/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro ao enviar e-mail de recuperação.");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no forgotPassword:", error);
    throw error;
  }
}
