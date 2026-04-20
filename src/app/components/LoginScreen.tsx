import { useState } from 'react';
import { UserCheck, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginScreenProps {
  onContinue: (cpf: string) => void;
}

function validarCPF(cpf: string): boolean {
  return true;
}

export function LoginScreen({ onContinue }: LoginScreenProps) {
  const [cpf, setCpf] = useState('');
  const [touched, setTouched] = useState(false);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
    if (touched) setTouched(false);
  };

  const isComplete = cpf.length === 14;
  const isValid = isComplete && validarCPF(cpf);
  const showError = isComplete && !isValid;

  const handleSubmit = () => {
    setTouched(true);
    if (isValid) onContinue(cpf);
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F7F5]">
      {/* Cabeçalho */}
      <div className="bg-[#0B4F3A] px-6 pt-10 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-12 h-12 bg-[#1D9E75] rounded-2xl flex items-center justify-center shadow-lg">
            <UserCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-white text-[24px] font-[800] tracking-wide">SERMIL MAPS</h1>
            <p className="text-[#9FE1CB] text-[11px] font-[500]">Navegação interna</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-1.5 bg-[#0F6E56] px-3 py-1.5 rounded-full"
        >
          <Home className="w-3 h-3 text-[#5DCAA5]" />
          <p className="text-[#9FE1CB] text-[11px] font-[500]">Res. Jardim das Flores — Campina Grande</p>
        </motion.div>
      </div>

      {/* Corpo */}
      <div className="flex-1 px-6 py-10 flex flex-col justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-[#0B4F3A] text-[26px] font-[800] mb-1">Bem-vindo</h2>
            <p className="text-[#6B9E8A] text-[14px] mb-8">Informe seu CPF para registrar sua entrada</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-[#0B4F3A] text-[11px] font-[700] mb-2 uppercase tracking-widest">
              Seu CPF
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={cpf}
              onChange={handleChange}
              onBlur={() => isComplete && setTouched(true)}
              placeholder="000.000.000-00"
              aria-label="Campo de CPF"
              className={`w-full px-4 py-4 border-2 rounded-[14px] text-[20px] font-[700] tracking-widest focus:outline-none bg-white transition-colors ${
                showError
                  ? 'border-red-400 focus:border-red-500 text-red-600'
                  : isValid
                  ? 'border-[#1D9E75] text-[#0B4F3A]'
                  : 'border-[#E0E0DB] focus:border-[#1D9E75] text-[#0B4F3A]'
              }`}
              maxLength={14}
            />
            {showError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-[12px] mt-2 font-[500]"
              >
                CPF inválido. Verifique os números e tente novamente.
              </motion.p>
            )}
            {!showError && (
              <p className="text-[#AAB8B4] text-[12px] mt-2">Usado apenas para controle de acesso</p>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={handleSubmit}
            disabled={!isComplete}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-[#0B4F3A] text-white py-4 rounded-[14px] text-[16px] font-[700] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0F6E56] transition-colors active:scale-[0.97]"
          >
            Continuar
          </motion.button>
          <p className="text-center text-[#B0BCB8] text-[11px] mt-4 leading-relaxed">
            Seus dados são protegidos e usados<br />apenas para registro de entrada
          </p>
        </motion.div>
      </div>
    </div>
  );
}
