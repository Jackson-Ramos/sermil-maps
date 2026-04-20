import { ArrowLeft, Navigation, MapPin } from 'lucide-react';

interface NavigationModeScreenProps {
  quadra: string;
  lote: string;
  onSelectMode: (mode: 'sermil' | 'google' | 'waze') => void;
  onBack: () => void;
}

export function NavigationModeScreen({ quadra, lote, onSelectMode, onBack }: NavigationModeScreenProps) {
  return (
    <div className="h-full flex flex-col bg-[#F7F7F5]">
      <div className="bg-white border-b border-[#E0E0DB] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#0F6E56]">9:41</span>
        </div>
      </div>

      <div className="bg-[#0B4F3A] px-6 py-6">
        <button onClick={onBack} className="flex items-center gap-2 mb-4 text-[#9FE1CB]">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px] font-[700]">Voltar</span>
        </button>
        <h2 className="text-white text-[24px] font-[800]">Como quer navegar?</h2>
      </div>

      <div className="flex-1 px-6 py-6">
        <div className="bg-white border-2 border-[#5DCAA5] rounded-[16px] p-4 mb-6">
          <p className="text-[#0F6E56] text-[11px] font-[700] uppercase mb-1">DESTINO</p>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0B4F3A]" />
            <p className="text-[#0B4F3A] text-[18px] font-[800]">
              Quadra {quadra} — Lote {lote}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onSelectMode('sermil')}
            className="w-full bg-[#0B4F3A] text-white py-4 px-6 rounded-[16px] flex items-center gap-3 hover:bg-[#0F6E56] transition-colors"
          >
            <div className="w-10 h-10 bg-white/20 rounded-[10px] flex items-center justify-center">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <span className="text-[16px] font-[700]">Navegar pelo SERMIL MAPS</span>
          </button>

          <button
            onClick={() => onSelectMode('google')}
            className="w-full bg-[#E1F5EE] text-[#0B4F3A] py-4 px-6 rounded-[16px] flex items-center gap-3 hover:bg-[#9FE1CB] transition-colors"
          >
            <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
            </div>
            <span className="text-[16px] font-[700]">Abrir no Google Maps</span>
          </button>

          <button
            onClick={() => onSelectMode('waze')}
            className="w-full bg-[#E1F5EE] text-[#0B4F3A] py-4 px-6 rounded-[16px] flex items-center gap-3 hover:bg-[#9FE1CB] transition-colors"
          >
            <div className="w-10 h-10 bg-[#33CCFF] rounded-[10px] flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <span className="text-[16px] font-[700]">Abrir no Waze</span>
          </button>
        </div>
      </div>
    </div>
  );
}
