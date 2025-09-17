"use client";
import React, { useState, useEffect } from "react";
import { getCandidaturas, Candidatura } from "../../../lib/candidaturas-get";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  HardHat,
  Calendar,
  CheckCircle,
  BookOpen,
  Award,
  User,
  Clock,
  FileCheck,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { enviarCandidatura } from "../../../lib/enviar-candidatura-actions";
import toast from "react-hot-toast";
import CursoCandidaturaSkeleton from "../../../components/common/CursosSkeleton";
import { getCandidato } from "../../../lib/candidato-actions";

interface CursoReal {
  id: string;
  nome: string;
  preco: number;
  precoTeste: number;
  descricao: string | null;
  dataInicio: string | null;
  dataFim: string | null;
  createdAt: string;
  updatedAt: string;
}

const CursoCandidatura = () => {
  const router = useRouter();
  const params = useParams();
  const [curso, setCurso] = useState<CursoReal | null>(null);
  const [loading, setLoading] = useState(true);
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [candidato, setCandidato] = useState<any>(null);
  const [jaInscrito, setJaInscrito] = useState(false);

  // Benefícios do curso (dados estáticos)
  const beneficiosCurso = [
    "Certificado reconhecido",
    "Estágio em empresas parceiras",
    "Preparação para o mercado de trabalho",
    "Acesso a bolsa de emprego",
    "Material didático incluído",
    "Acompanhamento personalizado",
  ];

  // Benefícios para o candidato
  const beneficiosCandidato = [
    "Oportunidade de emprego na área",
    "Desenvolvimento de habilidades técnicas",
    "Networking com profissionais do sector",
    "Possibilidade de crescimento profissional",
    "Acesso a sector em alta demanda",
    "Salários competitivos no mercado",
  ];

  // Passos após a candidatura
  const passosAposCandidatura = [
    {
      titulo: "Análise da Candidatura",
      descricao:
        "Nossa equipe analisará a sua candidatura e poderás controlar o processo no seu Perfil",
      icone: <FileCheck className="w-6 h-6" />,
    },
    {
      titulo: "Teste de Diagnóstico",
      descricao: "Realização do teste para avaliar conhecimentos",
      icone: <GraduationCap className="w-6 h-6" />,
    },
    {
      titulo: "Início da Formação",
      descricao:
        "Após a aprovação no teste, será informado sobre a data do início da formação",
      icone: <BookOpen className="w-6 h-6" />,
    },
  ];

  // Requisitos do curso (dados estáticos)
  const requisitos = ["Idade mínima: 18 anos", "Disponibilidade para formação"];

  // Buscar curso real da API e verificar candidaturas
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar curso
        const response = await fetch(
          `https://backend-promet.unitec.academy/curso/${params.id}`
        );
        if (!response.ok) throw new Error("Erro ao buscar curso");
        const data: CursoReal = await response.json();
        setCurso(data);

        // Buscar candidato e candidaturas
        const candidatoData = await getCandidato();
        setCandidato(candidatoData);

        if (candidatoData) {
          const candidaturasData: Candidatura[] = await getCandidaturas();
          setCandidaturas(candidaturasData);
          
          // Verificar se já está inscrito em algum curso
          const inscrito = candidaturasData.some(
            (c) => c.idCandidato === candidatoData.id
          );
          setJaInscrito(inscrito);
        }
      } catch (error) {
        console.error(error);
        setCurso(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const handleCandidatarSe = async (cursoId: string) => {
    try {
      if (jaInscrito) {
        toast.error("Já estás inscrito num curso.");
        return;
      }

      // 1️⃣ Verifica se o usuário tem perfil de candidato
      if (!candidato) {
        toast.error("Preencha os dados do seu perfil para candidatar-se.");
        return;
      }

      // 2️⃣ Envia a candidatura com toast.promise
      await toast.promise(enviarCandidatura({ idCurso: cursoId }), {
        loading: "A enviar candidatura...",
        success: "Candidatura enviada com sucesso!",
        error: "Erro ao enviar candidatura. Tente novamente.",
      });

      // 3️⃣ Redireciona
      router.push("/user/candidaturas");
    } catch (error: any) {
      console.error("Erro ao candidatar-se:", error);
      toast.error(error?.message || "Erro ao processar candidatura.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <CursoCandidaturaSkeleton />
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Curso não encontrado
          </h2>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-brand-main text-white rounded-lg hover:bg-brand-lime transition-colors duration-300 flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const descricao = curso.descricao ?? "Descrição não disponível";
  const dataInicio = curso.dataInicio
    ? new Date(curso.dataInicio).toLocaleDateString("pt-BR")
    : "A definir";
  const dataFim = curso.dataFim
    ? new Date(curso.dataFim).toLocaleDateString("pt-BR")
    : "A definir";

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-main-light/5 via-white to-brand-main-light/10 dark:from-gray-900 dark:via-gray-800 dark:to-brand-main/10 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => router.back()}
          className="flex items-center text-brand-main dark:text-brand-lime mb-6 hover:underline"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        {/* Cabeçalho com informações do curso */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 bg-brand-main/10 rounded-full flex items-center justify-center mr-4">
                <HardHat className="w-6 h-6 text-brand-main" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {curso.nome}
                </h1>
                <p className="text-gray-600 text-sm dark:text-gray-300 mt-1">
                  Teste de Diagnóstico{" "}
                  <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full mb-2">
                    {curso.precoTeste}MT
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <button
                onClick={() => handleCandidatarSe(curso.id)}
                disabled={jaInscrito}
                className={`px-6 py-3 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center ${
                  jaInscrito
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-brand-main hover:bg-brand-main/70"
                }`}
              >
                {jaInscrito ? "Já Inscrito" : "Candidatar-se"}
              </button>
              
              {/* Mensagem informativa */}
              {jaInscrito && (
                <div className="mt-3 flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <XCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm text-yellow-700 dark:text-yellow-300">
                    Você já está inscrito em um curso
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 text-brand-main mr-2" />
              <span className="text-gray-600 dark:text-gray-300">
                Início: {dataInicio}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 text-brand-main mr-2" />
              <span className="text-gray-600 dark:text-gray-300">
                Duração: 30 Dias
              </span>
            </div>
            <div className="flex items-center text-sm">
              <User className="w-4 h-4 text-brand-main mr-2" />
              <span className="text-gray-600 dark:text-gray-300">
                Vagas limitadas
              </span>
            </div>
          </div>
        </div>

        {/* Processo após candidatura */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-brand-main dark:text-white mb-6 text-center">
            Processo Após a Candidatura
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passosAposCandidatura.map((passo, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-brand-main/10 rounded-full flex items-center justify-center mb-3 text-brand-main">
                  {passo.icone}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {passo.titulo}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {passo.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid com três colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Primeiro Card: Benefícios do Curso */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Benefícios do Curso
              </h3>
            </div>
            <ul className="space-y-3">
              {beneficiosCurso.map((beneficio, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {beneficio}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Segundo Card: Benefícios para o Candidato */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                <Briefcase className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Vantagens para Você
              </h3>
            </div>
            <ul className="space-y-3">
              {beneficiosCandidato.map((beneficio, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-brand-main mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {beneficio}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terceiro Card: Requisitos */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                <FileCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Requisitos de Inscrição
              </h3>
            </div>
            <ul className="space-y-3">
              {requisitos.map((requisito, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {requisito}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mt-2.5 space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-500 mr-2  flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Interesse pela área de {curso.nome}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5">
            <h3 className="text-md font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Informações Importantes
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <li>• As vagas são limitadas</li>
              <li>• Início das aulas: {dataInicio}</li>
              <li>• Duração: 30 Dias</li>
              <li>• Modalidade: Presencial</li>
              <li>• Local: Após a aprovação da candidatura</li>
              <li>• Horário: Segunda a Sexta, 18h-21h</li>
            </ul>
          </div>

          <div className="bg-brand-main/5 dark:bg-brand-main/10 rounded-xl p-5">
            <h3 className="text-md font-semibold text-brand-main dark:text-brand-lime mb-3 flex items-center">
              <HeartHandshake className="w-5 h-5 mr-2" />
              Por que escolher este curso?
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• Sector em crescimento em Moçambique</li>
              <li>• Professores com experiência prática</li>
              <li>• Infraestrutura moderna e adequada</li>
              <li>• Parcerias com empresas do sector</li>
              <li>• Alta taxa de empregabilidade</li>
              <li>• Certificação reconhecida nacionalmente</li>
            </ul>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-10">
          <button
            onClick={() => handleCandidatarSe(curso.id)}
            disabled={jaInscrito}
            className={`px-8 py-4 text-white font-bold rounded-lg transition-colors duration-300 text-lg ${
              jaInscrito
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-brand-main hover:bg-brand-lime"
            }`}
          >
            {jaInscrito ? "Já Inscrito em um Curso" : "Quero me Candidatar Agora"}
          </button>
          
          {/* Mensagem informativa */}
          {jaInscrito && (
            <div className="mt-4 flex items-center justify-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-3 rounded-lg border border-yellow-200 dark:border-yellow-700 max-w-md mx-auto">
              <XCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <span className="text-sm text-yellow-700 dark:text-yellow-300">
                Você já está inscrito em um curso. Só pode candidatar-se a um curso por Edição.
              </span>
            </div>
          )}
          
          {!jaInscrito && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
              Não perca esta oportunidade! Vagas limitadas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CursoCandidatura;