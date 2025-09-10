"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { forgotPassword } from "../../../lib/reset-password-actions";
import { toast, Toaster } from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await forgotPassword(email);
      toast.success("Verifique seu e-mail para redefinir a senha!");
    } catch (err: any) {
      toast.error(err.message || "Erro ao enviar link de redefinição.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1f2937',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
      
      <div className="min-h-screen flex items-center justify-center p-4 bg-blue-50 dark:bg-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full max-w-md bg-white/95 dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-brand-main rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="w-7 h-7 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold dark:text-white text-gray-800 mb-2">Recuperar Senha</h1>
            <p className="text-gray-600 dark:text-white text-sm">
              Digite seu e-mail para receber instruções de redefinição
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="sr-only">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 dark:text-white top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 dark:text-white py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-main/30 focus:border-brand-main/50 transition-all"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full bg-brand-main text-white py-3.5 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Enviando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Enviar Link de Recuperação
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Lembrou sua senha?{" "}
              <a href="/login" className="text-brand-main hover:text-brand-lime font-medium transition-colors">
                Fazer login
              </a>
            </p>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-brand-main mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-xs text-gray-600">
                Enviaremos um para redefinir sua senha. O link expira em 15 minutos.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}