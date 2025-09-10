"use client";

import { useState } from "react";
import { Edit3, Mail, Phone, User, BookOpen, Briefcase, Check, Loader2 } from "lucide-react";
import { Candidato } from "../../../lib/candidato-actions";
import { updateUser } from "../../../lib/user-actions";
import { toast } from "react-hot-toast";

type Props = {
  candidato: Candidato;
};

export default function CandidatoHeader({ candidato }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contacto, setContacto] = useState(candidato.contacto || "");
  const [nome, setNome] = useState(candidato.user.nome || "");
  const [apelido, setApelido] = useState(candidato.user.apelido || "");

  const nomeCompleto = `${nome} ${apelido}`;
  const totalExperiencias = candidato.experiencias?.length || 0;
  const totalFormacoes = candidato.formacoes?.length || 0;

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      await updateUser({
        id: candidato.user.id,
        nome,
        apelido,
        email: candidato.user.email,
      });
      
      setIsEditing(false);
      toast.success("Dados atualizados com sucesso!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: '#10B981',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10B981',
        },
      });
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      toast.error("Erro ao atualizar dados. Tente novamente.", {
        duration: 4000,
        position: "top-right",
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setNome(candidato.user.nome || "");
    setApelido(candidato.user.apelido || "");
    setContacto(candidato.contacto || "");
    setIsEditing(false);
  };

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
                  @{candidato.user.username}
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold text-brand-main dark:text-white">
                  {nomeCompleto}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{candidato.user.username}
                </p>
              </>
            )}

            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
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
                  <span>{candidato.contacto}</span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 mr-1 text-brand-main dark:text-brand-lime flex-shrink-0" />
                <span>{candidato.user.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="flex gap-4">
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
        </div>

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