"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, UserPlus, CheckCircle, KeyRound, UserCircle, RefreshCcw } from "lucide-react";
import { registerUser } from "../../lib/register-user-actions";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PasswordStrength = {
  strength: number;
  label: string;
  color: string;
  width: string;
};

const FloatingShapes = () => (
  <div className="absolute dark:bg-gray-900/90 inset-0 overflow-hidden pointer-events-none opacity-30">
    {/* SVG animados */}
    <motion.div
      initial={{ x: -100, y: -100, rotate: 0 }}
      animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "5%", "-10%"], rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute top-20 left-20"
    >
      <svg width="60" height="60" viewBox="0 0 60 60" className="text-brand-main/15">
        <circle cx="30" cy="30" r="25" fill="currentColor" />
      </svg>
    </motion.div>

    <motion.div
      initial={{ x: 200, y: 300, rotate: 0 }}
      animate={{ x: ["15%", "5%", "15%"], y: ["25%", "35%", "25%"], rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-40 right-40"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" className="text-brand-lime/15">
        <circle cx="20" cy="20" r="15" fill="currentColor" />
      </svg>
    </motion.div>

    <motion.div
      initial={{ x: 300, y: 100, rotate: 0 }}
      animate={{ x: ["25%", "15%", "25%"], y: ["10%", "20%", "10%"], rotate: 180 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      className="absolute top-60 right-20"
    >
      <svg width="50" height="50" viewBox="0 0 50 50" className="text-brand-main/10">
        <polygon points="25,5 45,40 5,40" fill="currentColor" />
      </svg>
    </motion.div>
  </div>
);

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    apelido: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [usernameEdited, setUsernameEdited] = useState(false);

  // Gera username aleatório com 4 números
  const generateUsername = (nome: string, apelido: string) => {
    if (!nome || !apelido) return "";
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `${nome}${apelido}${randomNumbers}`.toLowerCase().replace(/\s+/g, '');
  };

  useEffect(() => {
    if (form.nome && form.apelido && !usernameEdited) {
      setForm(prev => ({ ...prev, username: generateUsername(form.nome, form.apelido) }));
    }
  }, [form.nome, form.apelido, usernameEdited]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === "username") setUsernameEdited(true);
  };

  const passwordStrength: PasswordStrength = useMemo(() => {
    if (!form.password) return { strength: 0, label: "Muito Fraca", color: "bg-red-400", width: "w-0" };
    let strength = 0;
    if (form.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(form.password)) strength += 1;
    if (/[0-9]/.test(form.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(form.password)) strength += 1;

    const strengths: PasswordStrength[] = [
      { strength: 0, label: "Muito Fraca", color: "bg-red-400", width: "w-1/5" },
      { strength: 1, label: "Fraca", color: "bg-orange-500", width: "w-2/5" },
      { strength: 2, label: "Média", color: "bg-yellow-400", width: "w-3/5" },
      { strength: 3, label: "Forte", color: "bg-green-400", width: "w-4/5" },
      { strength: 4, label: "Muito Forte", color: "bg-brand-main", width: "w-full" },
    ];

    return strengths[Math.min(strength, 4)];
  }, [form.password]);

  const passwordsMatch = useMemo(() => form.password === form.confirmPassword, [form.password, form.confirmPassword]);

  const isFormValid = useMemo(() => {
    return (
      form.nome.trim() &&
      form.apelido.trim() &&
      form.email.trim() &&
      form.username.trim() &&
      form.password.trim() &&
      form.confirmPassword.trim() &&
      passwordsMatch &&
      acceptedTerms
    );
  }, [form, acceptedTerms, passwordsMatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const { confirmPassword, ...userData } = form;
      await registerUser(userData);
      toast.success("Conta criada com sucesso! 🎉");

      setForm({ nome: "", apelido: "", email: "", username: "", password: "", confirmPassword: "" });
      setAcceptedTerms(false);
      setUsernameEdited(false);

      setTimeout(() => router.push("/login"), 1000);
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex items-center justify-center py-8 p-4 relative dark:bg-gray-700/50 bg-slate-50 overflow-hidden min-h-screen">
        <FloatingShapes />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative z-10 flex w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:bg-gray-900/90 dark:border-gray-700/50 overflow-hidden"
        >
          {/* Lado esquerdo */}
          <div className="hidden md:flex flex-1 relative">
            <Image src="/images/reg.jpg" alt="Cadastro" width={600} height={800} className="w-full object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-main/70 to-brand-lime/70 mix-blend-multiply" />
          </div>

          {/* Lado direito - Formulário */}
          <div className="flex-1 p-5 md:p-6">
            <div className="text-center mb-5">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-12 h-12 bg-gradient-to-r from-brand-main to-brand-lime rounded-full flex items-center justify-center mx-auto mb-2"
              >
                <UserPlus className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Criar Conta</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Preencha seus dados para começar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Nome e Apelido */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="nome" className="sr-only">Nome</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="nome"
                      type="text"
                      name="nome"
                      placeholder="Nome"
                      value={form.nome}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-main/30 focus:border-brand-main/20 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="apelido" className="sr-only">Apelido</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="apelido"
                      type="text"
                      name="apelido"
                      placeholder="Apelido"
                      value={form.apelido}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-main/30 focus:border-brand-main/20 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-main/30 focus:border-brand-main/20 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full pl-9 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-main/30 focus:border-brand-main/20 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, username: generateUsername(prev.nome, prev.apelido) }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Gerar novo username"
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {usernameEdited ? "Você personalizou seu username" : "Username gerado automaticamente com 4 números"}
                </p>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="sr-only">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Senha"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-main/30 focus:border-brand-main/20 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Força: {passwordStrength.label}</span>
                      <div className={`w-3 h-3 rounded-full ${passwordStrength.color}`} />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div className={`h-1.5 rounded-full transition-all duration-500 ${passwordStrength.color} ${passwordStrength.width}`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirmar Senha"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-9 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-main/30 focus:border-brand-main/20 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {!passwordsMatch && form.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(prev => !prev)}
                  id="terms"
                  className="w-4 h-4 text-brand-main border-gray-300 rounded focus:ring-1 focus:ring-brand-main/30"
                />
                <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400">
                  Aceito os{" "}
                  <Link href="/terms" className="text-brand-main hover:text-brand-lime">Termos e Condições</Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full py-2 bg-brand-main hover:bg-brand-lime text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Cadastrando..." : "Criar Conta"}
              </button>
            </form>

            <div className="text-center mt-5">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-brand-main hover:text-brand-lime font-medium">
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
