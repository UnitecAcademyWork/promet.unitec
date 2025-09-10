"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRightToLine } from "lucide-react";
import Cookies from "js-cookie";
import { loginUser } from "../../../lib/login-actions";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginUser(form);

      if (result?.token) {
        Cookies.set("auth_token", result.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        
        toast.success("Login realizado com sucesso!");
        console.log("Token salvo:", result.token);

        setTimeout(() => {
          window.location.href = "/user/perfil";
        }, 1500);
      } else {
        toast.error("Token não encontrado na resposta");
      }
    } catch (error) {
      toast.error("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast("Google Login em breve!", {
      icon: '👋',
    });
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1f2937',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
      
      <div className="min-h-[90vh] flex items-center justify-center p-4 bg-slate-50 dark:bg-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{ maxHeight: '500px' }}
        >
          {/* Lado Esquerdo - Formulário */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <div className="text-center mb-5">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-14 h-14 bg-brand-main rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <LogIn className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold text-brand-main mb-1">Bem-vindo de volta!</h1>
              <p className="text-gray-600 text-xs">Entre na sua conta para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="identifier" className="sr-only">Email ou Username</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="identifier"
                    type="text"
                    name="identifier"
                    placeholder="Email ou Username"
                    value={form.identifier}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                    required
                  />
                </div>
              </div>

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
                    className="w-full pl-10 pr-10 py-2.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link href="/recuperar-senha" className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full bg-brand-main text-white py-2.5 rounded-lg font-medium text-xs shadow-md hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Entrar
                    <ArrowRightToLine  className="w-4 h-4 ml-2" />
                  </div>
                )}
              </motion.button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-200 w-full"></div>
                <span className="bg-white px-2 text-xs text-gray-500">ou</span>
                <div className="border-t border-gray-200 w-full"></div>
              </div>

              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2.5 rounded-lg font-medium text-xs border border-gray-200 shadow-sm hover:shadow transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Entrar com Google
              </motion.button>
            </form>

            <div className="text-center mt-4">
              <p className="text-xs text-gray-600">
                Não tem uma conta?{" "}
                <Link href="/registro" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-purple-600/70 mix-blend-multiply" />
            <Image
              src="/images/reg.jpg"
              alt="Login"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <div className="max-w-xs">
                <h2 className="text-lg font-bold mb-2">Junte-se à Nossa Comunidade</h2>
                <p className="text-white/90 text-sm">
                  Faça parte de uma plataforma inovadora com oportunidades únicas.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}