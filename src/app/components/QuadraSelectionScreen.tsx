import { ArrowLeft, ChevronRight, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuadraSelectionScreenProps {
  onSelect: (quadra: string) => void;
  onBack: () => void;
}

const quadras = [
  { id: 'A', name: 'Quadra A', lotes: 'Lotes 01–30', total: 30 },
  { id: 'B', name: 'Quadra B', lotes: 'Lotes 31–60', total: 30 },
  { id: 'C', name: 'Quadra C', lotes: 'Lotes 61–90', total: 30 },
  { id: 'D', name: 'Quadra D', lotes: 'Lotes 91–120', total: 30 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

export function QuadraSelectionScreen({ onSelect, onBack }: QuadraSelectionScreenProps) {
  return (
    <div className="h-full flex flex-col bg-[#F7F7F5]">
      {/* Status contextual — entrada registrada */}
      <div className="bg-[#0F6E56] px-4 py-1.5 flex items-center justify-between">
        <span className="text-[#9FE1CB] text-[11px] font-[500]">
          {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="text-[#5DCAA5] text-[11px] font-[700]">Entrada registrada ✓</span>
      </div>

      {/* Cabeçalho */}
      <div className="bg-[#0B4F3A] px-6 py-6">
        <button
          onClick={onBack}
          aria-label="Voltar para tela de identificação"
          className="flex items-center gap-2 mb-4 text-[#9FE1CB] active:opacity-60 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px] font-[700]">Voltar</span>
        </button>
        <h2 className="text-white text-[24px] font-[800] mb-1">Qual é o destino?</h2>
        <p className="text-[#9FE1CB] text-[14px]">Selecione a quadra</p>
      </div>

      {/* Lista de quadras */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 px-6 py-6 space-y-3 overflow-auto"
      >
        {quadras.map((quadra) => (
          <motion.button
            key={quadra.id}
            variants={item}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(quadra.id)}
            className="w-full bg-white border-2 border-[#E0E0DB] rounded-[16px] p-4 flex items-center justify-between hover:bg-[#E1F5EE] hover:border-[#5DCAA5] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E1F5EE] rounded-[12px] flex items-center justify-center group-hover:bg-[#1D9E75] transition-colors">
                <Building2 className="w-6 h-6 text-[#0F6E56] group-hover:text-white transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-[#0B4F3A] text-[16px] font-[700]">{quadra.name}</p>
                <p className="text-[#6B9E8A] text-[12px] mt-0.5">{quadra.lotes}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#C8D8D4] group-hover:text-[#1D9E75] transition-colors" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
