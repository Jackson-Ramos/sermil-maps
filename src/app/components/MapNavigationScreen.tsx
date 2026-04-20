import { useState } from 'react';
import { X, Phone, ArrowUp, ChevronDown, ChevronUp, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface MapNavigationScreenProps {
  quadra: string;
  lote: string;
  onArrival: () => void;
  onBack: () => void;
}

export function MapNavigationScreen({ quadra, lote, onArrival, onBack }: MapNavigationScreenProps) {
  const [showRamalSheet, setShowRamalSheet] = useState(false);
  const [cardExpanded, setCardExpanded] = useState(false);

  return (
    <div className="h-full flex flex-col bg-[#F7F7F5] relative">
      {/* Header compacto de navegação */}
      <div className="bg-[#0B4F3A] px-5 py-3 flex items-center justify-between z-10 shadow-md">
        <button
          onClick={onBack}
          aria-label="Sair da navegação"
          className="flex items-center gap-2 text-[#9FE1CB] active:opacity-60 transition-opacity"
        >
          <X className="w-4 h-4" />
          <span className="text-[13px] font-[700]">Sair da navegação</span>
        </button>
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[#5DCAA5]" />
          <span className="text-white text-[13px] font-[700]">
            Q{quadra} — L{lote}
          </span>
          <div className="bg-[#1D9E75] px-2.5 py-1 rounded-full ml-1">
            <span className="text-white text-[12px] font-[800]">4 min</span>
          </div>
        </div>
      </div>

      {/* Área do mapa com zoom/pan */}
      <div className="flex-1 relative bg-[#dde8d4] overflow-hidden">
        <TransformWrapper
          initialScale={1}
          minScale={0.7}
          maxScale={4}
          centerOnInit
          wheel={{ step: 0.1 }}
        >
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
            contentStyle={{ width: '100%', height: '100%' }}
          >
            <svg
              viewBox="0 0 400 480"
              className="w-full h-full"
              style={{ display: 'block' }}
            >
              <rect width="400" height="480" fill="#dde8d4" />

              {/* Blocos de quadras */}
              <rect x="20" y="20"  width="100" height="70" rx="6" fill="#c8dbbf" stroke="#a8c0a0" strokeWidth="1"/>
              <rect x="140" y="20" width="100" height="70" rx="6" fill="#c8dbbf" stroke="#a8c0a0" strokeWidth="1"/>
              <rect x="260" y="20" width="120" height="70" rx="6" fill="#c8dbbf" stroke="#a8c0a0" strokeWidth="1"/>
              <rect x="20" y="110" width="100" height="70" rx="6" fill="#c8dbbf" stroke="#a8c0a0" strokeWidth="1"/>
              <rect x="140" y="110" width="100" height="70" rx="6" fill="#c8dbbf" stroke="#a8c0a0" strokeWidth="1"/>
              <rect x="260" y="110" width="120" height="70" rx="6" fill="#c8dbbf" stroke="#a8c0a0" strokeWidth="1"/>
              <rect x="20" y="200"  width="100" height="70" rx="6" fill="#c8dbbf" stroke="#a8c0a0" strokeWidth="1"/>
              <rect x="140" y="200" width="100" height="70" rx="6" fill="#c8dbbf" stroke="#a8c0a0" strokeWidth="1"/>

              {/* Destaque do lote de destino */}
              <rect x="275" y="110" width="90" height="70" rx="6" fill="#0B4F3A" opacity="0.85"/>

              {/* Labels das quadras */}
              <text x="70"  y="60"  fill="#2e7d32" fontSize="10" fontWeight="700" textAnchor="middle">Quadra A</text>
              <text x="190" y="60"  fill="#2e7d32" fontSize="10" fontWeight="700" textAnchor="middle">Quadra B</text>
              <text x="320" y="60"  fill="#2e7d32" fontSize="10" fontWeight="700" textAnchor="middle">Quadra C</text>
              <text x="70"  y="150" fill="#2e7d32" fontSize="10" fontWeight="700" textAnchor="middle">Quadra D</text>
              <text x="190" y="150" fill="#2e7d32" fontSize="10" fontWeight="700" textAnchor="middle">Quadra E</text>
              <text x="320" y="148" fill="#fff"    fontSize="10" fontWeight="800" textAnchor="middle">{`Q${quadra}-L${lote}`}</text>
              <text x="70"  y="240" fill="#2e7d32" fontSize="10" fontWeight="700" textAnchor="middle">Portaria</text>
              <text x="190" y="240" fill="#2e7d32" fontSize="10" fontWeight="700" textAnchor="middle">Praça</text>

              {/* Rua de fundo */}
              <rect x="120" y="0"  width="16" height="480" fill="#b8cdb0" opacity="0.5"/>
              <rect x="240" y="0"  width="16" height="480" fill="#b8cdb0" opacity="0.5"/>
              <rect x="0"   y="95" width="400" height="12" fill="#b8cdb0" opacity="0.5"/>
              <rect x="0"  y="188" width="400" height="12" fill="#b8cdb0" opacity="0.5"/>

              {/* Nome das ruas */}
              <text x="128" y="87"  fill="#6a8c6a" fontSize="9" fontWeight="600">Rua das Acácias</text>
              <text x="248" y="87"  fill="#6a8c6a" fontSize="9" fontWeight="600">Av. Central</text>

              {/* Rota tracejada */}
              <polyline
                points="50,420 50,300 128,300 128,145 257,145"
                fill="none"
                stroke="#f57f17"
                strokeWidth="3.5"
                strokeDasharray="8,5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Rota overlay verde */}
              <polyline
                points="50,420 50,300 128,300 128,145 257,145"
                fill="none"
                stroke="#1D9E75"
                strokeWidth="2.5"
                strokeDasharray="8,5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />

              {/* Posição do visitante */}
              <circle cx="50" cy="420" r="12" fill="#0B4F3A" stroke="white" strokeWidth="2.5"/>
              <circle cx="50" cy="420" r="5" fill="white"/>
              <text x="68" y="424" fill="#0B4F3A" fontSize="10" fontWeight="700">Você está aqui</text>

              {/* Destino */}
              <circle cx="320" cy="145" r="10" fill="#EA4335" stroke="white" strokeWidth="2"/>
              <text x="320" y="148" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">★</text>

              {/* Legenda */}
              <rect x="8" y="434" width="140" height="38" rx="6" fill="rgba(255,255,255,0.85)"/>
              <circle cx="22" cy="448" r="5" fill="#0B4F3A"/>
              <circle cx="22" cy="448" r="2" fill="white"/>
              <text x="32" y="452" fill="#0B4F3A" fontSize="9" fontWeight="700">Você está aqui</text>
              <line x1="15" y1="463" x2="30" y2="463" stroke="#1D9E75" strokeWidth="2.5" strokeDasharray="4,3"/>
              <text x="34" y="467" fill="#0B4F3A" fontSize="9">Rota até o lote</text>
            </svg>
          </TransformComponent>
        </TransformWrapper>

        {/* FAB de telefone */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowRamalSheet(true)}
          aria-label="Ligar para o ramal do morador"
          className="absolute bottom-6 right-5 w-14 h-14 bg-[#0B4F3A] rounded-full flex items-center justify-center shadow-xl hover:bg-[#0F6E56] transition-colors z-20 border-2 border-white/20"
        >
          <Phone className="w-6 h-6 text-white" />
        </motion.button>

        {/* Dica de zoom */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full pointer-events-none">
          Pince para ampliar o mapa
        </div>
      </div>

      {/* Card inferior de instrução — colapsável */}
      <div className="bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-[24px] relative z-10">
        {/* Handle + toggle */}
        <button
          onClick={() => setCardExpanded(!cardExpanded)}
          aria-label={cardExpanded ? 'Recolher instruções' : 'Expandir instruções'}
          className="w-full flex flex-col items-center pt-3 pb-1 active:opacity-70 transition-opacity"
        >
          <div className="w-10 h-1 bg-[#E0E0DB] rounded-full mb-2" />
          <div className="flex items-center gap-1 text-[#0B4F3A]">
            <span className="text-[10px] font-[600] text-[#9B9B9B]">{cardExpanded ? 'Recolher' : 'Ver detalhes'}</span>
            {cardExpanded ? <ChevronDown className="w-3 h-3 text-[#9B9B9B]" /> : <ChevronUp className="w-3 h-3 text-[#9B9B9B]" />}
          </div>
        </button>

        <div className="px-6 pb-2">
          {/* Instrução principal — sempre visível */}
          <div className="flex items-start gap-4 mb-3">
            <div className="w-12 h-12 bg-[#0B4F3A] rounded-full flex items-center justify-center flex-shrink-0">
              <ArrowUp className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-[#0B4F3A] text-[17px] font-[800] leading-tight">Siga pela Rua das Acácias</h3>
              <p className="text-[#6B9E8A] text-[13px] mt-0.5">por 180m · vire à direita</p>
            </div>
          </div>

          {/* Detalhes colapsáveis */}
          <AnimatePresence initial={false}>
            {cardExpanded && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                className="overflow-hidden"
              >
                <div className="border-l-2 border-[#E1F5EE] ml-6 pl-5 space-y-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#1D9E75] rounded-full flex-shrink-0"/>
                    <p className="text-[#6B9E8A] text-[13px]">Vire à direita na Av. Central</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#1D9E75] rounded-full flex-shrink-0"/>
                    <p className="text-[#6B9E8A] text-[13px]">Continue por 120m</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#EA4335] rounded-full flex-shrink-0"/>
                    <p className="text-[#0B4F3A] text-[13px] font-[600]">Destino à esquerda · Lote {lote}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onArrival}
            className="w-full bg-[#E1F5EE] text-[#0B4F3A] py-3.5 rounded-[14px] text-[14px] font-[700] mb-4 hover:bg-[#D0EDDF] transition-colors border-2 border-[#C8E8D8]"
          >
            Cheguei ao destino
          </motion.button>
        </div>
      </div>

      {/* Bottom Sheet — Ramal do Morador */}
      <AnimatePresence>
        {showRamalSheet && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRamalSheet(false)}
              className="absolute inset-0 bg-black/40 z-30"
            />
            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[28px] z-40 px-6 pb-8 pt-4 shadow-2xl"
            >
              {/* Handle */}
              <div className="w-10 h-1 bg-[#E0E0DB] rounded-full mx-auto mb-5" />

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#E1F5EE] rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#0B4F3A]" />
                </div>
                <div>
                  <p className="text-[#6B9E8A] text-[11px] font-[600] uppercase tracking-wide">Ramal do morador</p>
                  <p className="text-[#0B4F3A] text-[22px] font-[800] tracking-wider">Ramal 112</p>
                </div>
              </div>

              <div className="bg-[#F7F7F5] rounded-[14px] px-4 py-3 mb-5">
                <p className="text-[#6B9E8A] text-[12px]">
                  <span className="font-[700] text-[#0B4F3A]">Quadra {quadra} — Lote {lote}</span>
                  <br />Res. Jardim das Flores
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#0B4F3A] text-white py-4 rounded-[16px] text-[16px] font-[700] flex items-center justify-center gap-2 hover:bg-[#0F6E56] transition-colors mb-3"
              >
                <Phone className="w-5 h-5" />
                Ligar agora
              </motion.button>

              <button
                onClick={() => setShowRamalSheet(false)}
                className="w-full text-[#6B9E8A] text-[14px] font-[600] py-2"
              >
                Cancelar
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
