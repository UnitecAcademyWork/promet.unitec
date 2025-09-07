"use client";
import { useState } from "react";
import { updateUser } from "../../../../lib/user-actions";

type Idioma = {
  id: number;
  nome: string;
  nivel: string;
};

export default function Idiomas() {
  const [idiomas, setIdiomas] = useState<Idioma[]>([]);
  const [form, setForm] = useState<Omit<Idioma, "id">>({
    nome: "",
    nivel: "",
  });

  const addIdioma = async (e: React.FormEvent) => {
    e.preventDefault();
    const novo: Idioma = { id: Date.now(), ...form };
    const updated = [...idiomas, novo];
    setIdiomas(updated);
    await updateUser({ idiomas: updated });
    setForm({ nome: "", nivel: "" });
  };

  return (
    <div>
      <form onSubmit={addIdioma} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Idioma"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Nível (Básico, Intermédio, Avançado)"
          value={form.nivel}
          onChange={(e) => setForm({ ...form, nivel: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-brand-main text-white px-4 py-2 rounded hover:bg-brand-lime transition"
        >
          Adicionar
        </button>
      </form>

      <div className="space-y-3">
        {idiomas.map((idioma) => (
          <div
            key={idioma.id}
            className="border p-3 rounded bg-white shadow-sm"
          >
            <p className="font-bold text-brand-main">{idioma.nome}</p>
            <p className="text-sm text-gray-600">{idioma.nivel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
