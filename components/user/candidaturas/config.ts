import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const statusConfig = {
  pendente: { label: "Pendente", icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-100" },
  aprovada: { label: "Aprovada", icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-100" },
  rejeitada: { label: "Rejeitada", icon: XCircle, color: "text-red-500", bgColor: "bg-red-100" },
  em_analise: { label: "Em Análise", icon: AlertCircle, color: "text-blue-500", bgColor: "bg-blue-100" }
};

export const pagamentoConfig = {
  pendente: { label: "Pagamento Pendente", color: "text-yellow-500", bgColor: "bg-yellow-100" },
  pago: { label: "Pagamento Confirmado", color: "text-green-500", bgColor: "bg-green-100" },
  isento: { label: "Isento de Pagamento", color: "text-gray-500", bgColor: "bg-gray-100" }
};