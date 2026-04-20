import { useState } from 'react';
import { X, Phone, ArrowUp, MapPin, Navigation } from 'lucide-react';

interface MapNavigationScreenProps {
  quadra: string;
  lote: string;
  onArrival: () => void;
  onBack: () => void;
}

export function MapNavigationScreen({ quadra, lote, onArrival, onBack }: MapNavigationScreenProps) {
  const [showPhonePopup, setShowPhonePopup] = useState(false);

  return (
    <div className="h-full flex flex-col bg-[#F7F7F5] relative">
      <div className="bg-[#0B4F3A] px-6 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#9FE1CB]">
          <X className="w-5 h-5" />
          <span className="text-[14px] font-[700]">Sair da navegação</span>
        </button>
      </div>

      <div className="bg-white border-b border-[#E0E0DB] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-[#0B4F3A]" />
          <p className="text-[#0B4F3A] text-[14px] font-[700]">
            Navegando até Quadra {quadra} — Lote {lote}
          </p>
        </div>
        <div className="bg-[#E1F5EE] px-3 py-1 rounded-full">
          <p className="text-[#0B4F3A] text-[12px] font-[700]">4 min</p>
        </div>
      </div>

      <div className="flex-1 relative bg-[#E1F5EE]">
        <svg className="w-full h-full" viewBox="0 0 400 500">
          <rect x="20" y="20" width="360" height="460" fill="#E1F5EE" />

          <rect x="40" y="40" width="8" height="200" fill="#9FE1CB" />
          <rect x="40" y="40" width="200" height="8" fill="#9FE1CB" />
          <rect x="40" y="238" width="200" height="8" fill="#9FE1CB" />
          <rect x="232" y="40" width="8" height="200" fill="#9FE1CB" />

          <rect x="260" y="40" width="8" height="300" fill="#9FE1CB" />
          <rect x="260" y="40" width="100" height="8" fill="#9FE1CB" />
          <rect x="260" y="332" width="100" height="8" fill="#9FE1CB" />
          <rect x="352" y="40" width="8" height="300" fill="#9FE1CB" />

          <text x="140" y="140" fill="#0F6E56" fontSize="12" fontWeight="700">Rua das Acácias</text>
          <text x="280" y="200" fill="#0F6E56" fontSize="12" fontWeight="700">Av. Central</text>

          <line x1="50" y1="60" x2="310" y2="200" stroke="#1D9E75" strokeWidth="3" strokeDasharray="8,4" />
          <line x1="310" y1="200" x2="310" y2="300" stroke="#1D9E75" strokeWidth="3" strokeDasharray="8,4" />

          <circle cx="50" cy="60" r="12" fill="#0B4F3A" />
          <circle cx="50" cy="60" r="6" fill="white" />
          <text x="30" y="90" fill="#0B4F3A" fontSize="11" fontWeight="700">Você está aqui</text>

          <circle cx="310" cy="300" r="14" fill="#EA4335" />
          <path d="M310 290 L310 305 L305 300 Z" fill="white" />
          <text x="280" y="330" fill="#EA4335" fontSize="11" fontWeight="700">Destino</text>

          <rect x="80" y="100" width="40" height="40" fill="#5DCAA5" opacity="0.3" rx="4" />
          <text x="85" y="125" fill="#0B4F3A" fontSize="10" fontWeight="700">Lote 05</text>

          <rect x="290" y="280" width="40" height="40" fill="#EA4335" opacity="0.3" rx="4" />
          <text x="295" y="305" fill="#0B4F3A" fontSize="10" fontWeight="700">Lote {lote}</text>
        </svg>

        <button
          onClick={() => setShowPhonePopup(!showPhonePopup)}
          className="absolute bottom-32 right-6 w-14 h-14 bg-[#0B4F3A] rounded-full flex items-center justify-center shadow-lg hover:bg-[#0F6E56] transition-colors"
        >
          <Phone className="w-6 h-6 text-white" />
        </button>

        {showPhonePopup && (
          <div className="absolute bottom-48 right-6 bg-white rounded-[14px] shadow-xl p-4 w-64 border-2 border-[#E0E0DB]">
            <p className="text-[#0B4F3A] text-[14px] font-[700] mb-3">Ramal do morador</p>
            <p className="text-[#0F6E56] text-[16px] mb-3">Ramal 112</p>
            <button className="w-full bg-[#0B4F3A] text-white py-2 rounded-[10px] text-[14px] font-[700]">
              Ligar agora
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-t-[24px] shadow-2xl p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 bg-[#0B4F3A] rounded-full flex items-center justify-center flex-shrink-0">
            <ArrowUp className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#0B4F3A] text-[18px] font-[800] mb-1">Siga pela Rua das Acácias</h3>
            <p className="text-[#0F6E56] text-[14px]">por 180m · vire à direita</p>
          </div>
        </div>

        <div className="border-l-2 border-[#E0E0DB] ml-7 pl-7 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#5DCAA5] rounded-full"></div>
            <p className="text-[#0F6E56] text-[12px]">Continue na Av. Central por 120m</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#5DCAA5] rounded-full"></div>
            <p className="text-[#0F6E56] text-[12px]">Destino à esquerda</p>
          </div>
        </div>

        <button
          onClick={onArrival}
          className="w-full bg-[#E1F5EE] text-[#0B4F3A] py-3 rounded-[14px] text-[14px] font-[700] mt-6 hover:bg-[#9FE1CB] transition-colors"
        >
          Cheguei ao destino
        </button>
      </div>
    </div>
  );
}
