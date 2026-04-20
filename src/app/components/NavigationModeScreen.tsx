import { ArrowLeft, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationModeScreenProps {
  quadra: string;
  lote: string;
  onSelectMode: (mode: 'sermil' | 'google' | 'waze') => void;
  onBack: () => void;
}

// Ícone SVG original do Google Maps (cores reais da marca)
function GoogleMapsIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-6 h-6" fill="none">
      <path d="M24 4C15.163 4 8 11.163 8 20c0 12.75 16 28 16 28s16-15.25 16-28c0-8.837-7.163-16-16-16z" fill="#EA4335"/>
      <path d="M24 4C15.163 4 8 11.163 8 20c0 4.418 1.79 8.418 4.686 11.314L24 4z" fill="#FBBC04"/>
      <path d="M24 4l-11.314 31.314A16 16 0 0024 36c8.837 0 16-7.163 16-16 0-8.837-7.163-16-16-16z" fill="#4285F4"/>
      <circle cx="24" cy="20" r="6" fill="white"/>
    </svg>
  );
}

// Ícone SVG original do Waze (cores reais da marca)
function WazeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-6 h-6">
      <circle cx="24" cy="22" r="18" fill="#33CCFF"/>
      <ellipse cx="24" cy="30" rx="10" ry="8" fill="white"/>
      <circle cx="20" cy="34" r="3" fill="#666"/>
      <circle cx="29" cy="34" r="3" fill="#666"/>
      <circle cx="19" cy="18" r="3" fill="#333"/>
      <circle cx="29" cy="18" r="3" fill="#333"/>
      <path d="M20 24 Q24 27 28 24" stroke="#33CCFF" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

export function NavigationModeScreen({ quadra, lote, onSelectMode, onBack }: NavigationModeScreenProps) {
  return (
    <div className="h-full flex flex-col bg-[#F7F7F5]">
      {/* Cabeçalho */}
      <div className="bg-[#0B4F3A] px-6 py-6">
        <button
          onClick={onBack}
          aria-label="Voltar para seleção de lote"
          className="flex items-center gap-2 mb-4 text-[#9FE1CB] active:opacity-60 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px] font-[700]">Lotes</span>
        </button>
        <h2 className="text-white text-[24px] font-[800]">Como quer navegar?</h2>
        <p className="text-[#9FE1CB] text-[14px] mt-1">Escolha o modo de navegação</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 px-6 py-6"
      >
        {/* Card de destino */}
        <motion.div
          variants={fadeUp}
          className="bg-white border-2 border-[#1D9E75] rounded-[16px] p-4 mb-6 shadow-sm"
        >
          <p className="text-[#6B9E8A] text-[11px] font-[700] uppercase tracking-widest mb-2">Destino</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E1F5EE] rounded-[8px] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-[#0B4F3A]" />
            </div>
            <p className="text-[#0B4F3A] text-[18px] font-[800]">
              Quadra {quadra} — Lote {lote}
            </p>
          </div>
          <p className="text-[#9FE1CB] text-[12px] mt-1 ml-10">Res. Jardim das Flores</p>
        </motion.div>

        {/* Opções de navegação */}
        <div className="space-y-3">
          {/* SERMIL MAPS — destaque principal */}
          <motion.button
            variants={fadeUp}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectMode('sermil')}
            className="w-full bg-[#0B4F3A] text-white py-4 px-5 rounded-[16px] flex items-center gap-4 hover:bg-[#0F6E56] transition-colors shadow-md"
          >
            <div className="w-11 h-11 bg-white/15 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-[15px] font-[800]">Navegar pelo SERMIL MAPS</div>
              <div className="text-[11px] text-[#9FE1CB] font-[400] mt-0.5">Mapa interno · sem sair do app</div>
            </div>
          </motion.button>

          {/* Google Maps */}
          <motion.button
            variants={fadeUp}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectMode('google')}
            className="w-full bg-white border-2 border-[#E0E0DB] text-[#1B3A34] py-4 px-5 rounded-[16px] flex items-center gap-4 hover:border-[#EA4335] hover:bg-[#FFF5F5] transition-all"
          >
            <div className="w-11 h-11 bg-[#F5F5F5] rounded-[12px] flex items-center justify-center flex-shrink-0">
              <GoogleMapsIcon />
            </div>
            <div className="text-left">
              <div className="text-[15px] font-[700]">Abrir no Google Maps</div>
              <div className="text-[11px] text-[#9B9B9B] mt-0.5 flex items-center gap-1">
                Abre o app instalado <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </motion.button>

          {/* Waze */}
          <motion.button
            variants={fadeUp}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectMode('waze')}
            className="w-full bg-white border-2 border-[#E0E0DB] text-[#1B3A34] py-4 px-5 rounded-[16px] flex items-center gap-4 hover:border-[#33CCFF] hover:bg-[#F0FBFF] transition-all"
          >
            <div className="w-11 h-11 bg-[#F0FBFF] rounded-[12px] flex items-center justify-center flex-shrink-0">
              <WazeIcon />
            </div>
            <div className="text-left">
              <div className="text-[15px] font-[700]">Abrir no Waze</div>
              <div className="text-[11px] text-[#9B9B9B] mt-0.5 flex items-center gap-1">
                Abre o app instalado <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </motion.button>
        </div>

        <motion.p variants={fadeUp} className="text-[11px] text-[#B0BCB8] text-center mt-5 leading-relaxed">
          Recomendamos o mapa interno para<br />melhor experiência dentro do condomínio
        </motion.p>
      </motion.div>
    </div>
  );
}
