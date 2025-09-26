"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, CheckCircle, ArrowRight } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

interface ResetPasswordFormProps {
  email: string;
  otp: string;
  onSuccess?: () => void;
}

export default function ResetPasswordForm({ email, otp, onSuccess }: ResetPasswordFormProps) {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Critérios de validação da senha
  const passwordRequirements = {
    minLength: formData.newPassword.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.newPassword),
    hasLowerCase: /[a-z]/.test(formData.newPassword),
    hasNumber: /\d/.test(formData.newPassword),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      toast.error("A senha não atende aos requisitos mínimos");
      return;
    }
    
    if (!passwordsMatch) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);
    
    try {
      // Simula o processamento (não envia para o banco de dados)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Dados que seriam enviados:", {
        email,
        otp,
        newPassword: formData.newPassword
      });
      
      toast.success("Senha redefinida com sucesso!");
      
      // Limpa o formulário
      setFormData({ newPassword: "", confirmPassword: "" });
      
      // Chama callback de sucesso se fornecido
      if (onSuccess) onSuccess();
      
    } catch (err) {
      toast.error("Erro ao redefinir senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
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
              <Lock className="w-7 h-7 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold dark:text-white text-gray-800 mb-2">Nova Senha</h1>
            <p className="text-gray-600 dark:text-white text-sm">
              Digite sua nova senha
            </p>
            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-white">
                <strong>E-mail:</strong> {email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nova Senha */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium dark:text-white text-gray-700 mb-2">
                Nova Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 dark:text-white top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua nova senha"
                  value={formData.newPassword}
                  onChange={handleInputChange("newPassword")}
                  className="w-full pl-11 pr-10 dark:text-white py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-main/30 focus:border-brand-main/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium dark:text-white text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 dark:text-white top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua nova senha"
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  className="w-full pl-11 pr-10 dark:text-white py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-main/30 focus:border-brand-main/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Indicador de correspondência de senhas */}
            {formData.confirmPassword.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`p-3 rounded-lg border ${
                  passwordsMatch 
                    ? "bg-green-50 border-green-200" 
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${
                    passwordsMatch ? "text-green-500" : "text-red-500"
                  }`} />
                  <span className={`text-xs ${
                    passwordsMatch ? "text-green-700" : "text-red-700"
                  }`}>
                    {passwordsMatch ? "Senhas coincidem" : "Senhas não coincidem"}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Requisitos da Senha */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium dark:text-white mb-2">A senha deve conter:</h3>
              <div className="space-y-1">
                {Object.entries({
                  minLength: "Mínimo 8 caracteres",
                  hasUpperCase: "Letra maiúscula",
                  hasLowerCase: "Letra minúscula",
                  hasNumber: "Número",
                  hasSpecialChar: "Caractere especial"
                }).map(([key, text]) => (
                  <div key={key} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      passwordRequirements[key as keyof typeof passwordRequirements] 
                        ? "bg-green-500" 
                        : "bg-gray-300"
                    }`} />
                    <span className={`text-xs ${
                      passwordRequirements[key as keyof typeof passwordRequirements]
                        ? "text-green-700 dark:text-green-300"
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading || !isPasswordValid || !passwordsMatch}
              whileHover={!(loading || !isPasswordValid || !passwordsMatch) ? { scale: 1.02 } : {}}
              whileTap={!(loading || !isPasswordValid || !passwordsMatch) ? { scale: 0.98 } : {}}
              className="w-full bg-brand-main text-white py-3.5 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Redefinindo...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Redefinir Senha
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Lembrou sua senha?{" "}
              <a href="/login" className="text-brand-main hover:text-brand-lime font-medium transition-colors">
                Fazer login
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}