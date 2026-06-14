import { useState, useMemo } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLotes } from '../../data/getMapsLink';

interface LoteSelectionScreenProps {
  quadra: string;
  onSelect: (lote: string) => void;
  onBack: () => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export function LoteSelectionScreen({ quadra, onSelect, onBack }: LoteSelectionScreenProps) {
  const [selectedLote, setSelectedLote] = useState<string | null>(null);
  const [busca, setBusca] = useState('');

  // Lotes derivados do mapsLinks.json para a quadra atual.
  const todosLotes = useMemo(() => getLotes(quadra), [quadra]);

  const lotesFiltrados = useMemo(
    () => todosLotes.filter((l) => l.includes(busca)),
    [busca, todosLotes]
  );

  const handleLoteClick = (lote: string) => {
    setSelectedLote(lote);
    setTimeout(() => onSelect(lote), 280);
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F7F5]">
      {/* Status contextual */}
      <div className="bg-[#0F6E56] px-4 py-1.5 flex items-center justify-between">
        <span className="text-[#9FE1CB] text-[11px] font-[500]">
          {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="text-[#5DCAA5] text-[11px] font-[700]">Quadra {quadra} selecionada ✓</span>
      </div>

      {/* Cabeçalho */}
      <div className="bg-[#0B4F3A] px-6 py-6">
        <button
          onClick={onBack}
          aria-label="Voltar para seleção de quadra"
          className="flex items-center gap-2 mb-4 text-[#9FE1CB] active:opacity-60 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px] font-[700]">Quadras</span>
        </button>
        <h2 className="text-white text-[24px] font-[800] mb-1">Quadra {quadra}</h2>
        <p className="text-[#9FE1CB] text-[14px]">Selecione o lote de destino</p>
      </div>

      {/* Barra de busca */}
      <div className="px-6 py-4 bg-white border-b border-[#F0F0EC]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9FE1CB]" />
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Buscar lote..."
            value={busca}
            onChange={(e) => setBusca(e.target.value.replace(/\D/g, ''))}
            aria-label="Buscar número do lote"
            className="w-full pl-9 pr-9 py-2.5 rounded-[12px] border-2 border-[#E0E0DB] bg-[#F7F7F5] text-[14px] font-[600] text-[#0B4F3A] focus:outline-none focus:border-[#1D9E75] transition-colors"
          />
          <AnimatePresence>
            {busca && (
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                onClick={() => setBusca('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-[#AAB8B4]" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid de lotes */}
      <div className="flex-1 px-6 py-4 overflow-auto">
        {lotesFiltrados.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-40 text-[#B0BCB8]"
          >
            <Search className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-[13px]">Nenhum lote encontrado</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-4 gap-3"
          >
            {lotesFiltrados.map((lote) => {
              const selecionado = selectedLote === lote;
              return (
                <motion.button
                  key={lote}
                  variants={item}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleLoteClick(lote)}
                  title={`Lote ${lote}`}
                  className={`
                    aspect-square rounded-[14px] flex flex-col items-center justify-center text-[15px] font-[700] border-2 transition-all relative
                    ${selecionado
                      ? 'bg-[#0B4F3A] text-white border-[#0B4F3A] scale-95'
                      : 'bg-white text-[#0B4F3A] border-[#E0E0DB] hover:border-[#1D9E75] hover:bg-[#E1F5EE]'
                    }
                  `}
                >
                  {lote}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
