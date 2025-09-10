"use server";

export async function loginUser(credentials: {
  identifier: string; // pode ser username ou email
  password: string;
}) {
  try {
    const response = await fetch("https://backend-promet.unitec.academy/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }

    const data = await response.json();
    return data; // deve conter token/jwt
  } catch (error) {
    console.error("Erro no loginUser:", error);
    throw error;
  }
}
