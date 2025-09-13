"use client";

import { useEffect, useState } from "react";
import { Edit3, Mail, Phone, User, BookOpen, Briefcase, Check, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { getUser, updateUser, UserPerfilDados } from "../../../lib/user-actions";
import HeaderSkeleton from "./Loading/UsreHeader";

export default function CandidatoHeader() {
  const [candidatodados, setCandidatoDados] = useState<UserPerfilDados | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [contacto, setContacto] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setCandidatoDados(data);
      setNome(data.nome);
      setApelido(data.apelido);
      // setContacto(data.contacto);
    };
    fetchUser();
  }, []);

  const nomeCompleto = `${nome} ${apelido}`;
  // const totalExperiencias = candidatodados?.experiencias?.length || 0;
  // const totalFormacoes = candidatodados?.formacoes?.length || 0;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUser({
        id: candidatodados?.id,
        nome,
        apelido,
        email: candidatodados?.email,
      });
      toast.success("Dados atualizados com sucesso!", { duration: 3000 });
      setIsEditing(false);
      setCandidatoDados((prev: any) => prev ? { ...prev, nome, apelido, contacto } : prev);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar dados. Tente novamente.", { duration: 4000 });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (candidatodados) {
      setNome(candidatodados.nome);
      setApelido(candidatodados.apelido);
      setContacto(candidatodados.email);
    }
    setIsEditing(false);
  };

  if (!candidatodados) return <HeaderSkeleton />;

  return (
    <header className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        {/* Informações principais */}
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-brand-main/10 dark:bg-brand-main/20 p-3 rounded-full">
            <User className="w-6 h-6 text-brand-main dark:text-brand-lime" />
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-main"
                    placeholder="Nome"
                  />
                  <input
                    type="text"
                    value={apelido}
                    onChange={(e) => setApelido(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-main"
                    placeholder="Apelido"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{candidatodados.username}
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold text-brand-main dark:text-white">
                  {nomeCompleto}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{candidatodados.username}
                </p>
              </>
            )}

            <div className="flex flex-wrap gap-3 mt-2">
              {/* <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 mr-1 text-brand-main dark:text-brand-lime flex-shrink-0" />
                {isEditing ? (
                  <input
                    type="text"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    className="border rounded-lg px-3 py-1 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-main"
                    placeholder="Contacto"
                  />
                ) : (
                  <span>{candidatodados.email || "-"}</span>
                )}
              </div> */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 mr-1 text-brand-main dark:text-brand-lime flex-shrink-0" />
                <span>{candidatodados.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        {/* <div className="flex gap-4">
          <div className="bg-brand-main/5 dark:bg-brand-main/10 px-4 py-2 rounded-lg text-center min-w-[100px]">
            <div className="flex items-center justify-center gap-1 text-brand-main dark:text-brand-lime mb-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-lg font-bold">{totalExperiencias}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Experiências</p>
          </div>

          <div className="bg-brand-lime/10 dark:bg-brand-lime/10 px-4 py-2 rounded-lg text-center min-w-[100px]">
            <div className="flex items-center justify-center gap-1 text-brand-lime mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-lg font-bold">{totalFormacoes}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Formações</p>
          </div>
        </div> */}

        {/* Botão de ação */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition-colors text-sm font-medium min-w-[100px] justify-center"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {isSaving ? "Salvando..." : "Salvar"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-main hover:bg-brand-main/90 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
