import { useState } from 'react';
import { Map } from 'lucide-react';

interface LoginScreenProps {
  onContinue: (cpf: string) => void;
}

export function LoginScreen({ onContinue }: LoginScreenProps) {
  const [cpf, setCpf] = useState('');

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return cpf;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleSubmit = () => {
    if (cpf.length >= 14) {
      onContinue(cpf);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F7F5]">
      <div className="bg-[#0B4F3A] px-6 py-8">
        <div className="flex items-center gap-3 mb-2">
          <Map className="w-8 h-8 text-white" />
          <div>
            <h1 className="text-white text-[24px] font-[800]">SERMIL MAPS</h1>
            <p className="text-[#9FE1CB] text-[11px]">Navegação interna</p>
          </div>
        </div>
        <div className="inline-block bg-[#0F6E56] px-3 py-1 rounded-full mt-2">
          <p className="text-white text-[11px]">Res. Jardim das Flores</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-12 flex flex-col justify-between">
        <div>
          <h2 className="text-[#0B4F3A] text-[24px] font-[800] mb-2">Bem-vindo</h2>
          <p className="text-[#0F6E56] text-[14px] mb-12">Informe seu CPF para registrar sua entrada</p>

          <div>
            <label className="block text-[#0B4F3A] text-[11px] font-[700] mb-2 uppercase tracking-wide">
              SEU CPF
            </label>
            <input
              type="text"
              value={cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              className="w-full px-4 py-4 border-2 border-[#E0E0DB] rounded-[14px] text-[16px] focus:outline-none focus:border-[#1D9E75] bg-white text-[#0B4F3A]"
              maxLength={14}
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={cpf.length < 14}
            className="w-full bg-[#0B4F3A] text-white py-4 rounded-[14px] text-[16px] font-[700] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0F6E56] transition-colors"
          >
            Continuar
          </button>
          <p className="text-center text-[#0F6E56] text-[11px] mt-4">
            Seus dados são protegidos e usados apenas para registro de entrada
          </p>
        </div>
      </div>
    </div>
  );
}
