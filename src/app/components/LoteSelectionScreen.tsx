import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface LoteSelectionScreenProps {
  quadra: string;
  onSelect: (lote: string) => void;
  onBack: () => void;
}

export function LoteSelectionScreen({ quadra, onSelect, onBack }: LoteSelectionScreenProps) {
  const [selectedLote, setSelectedLote] = useState<string | null>(null);

  const lotes = Array.from({ length: 28 }, (_, i) => String(i + 1).padStart(2, '0'));

  const handleLoteClick = (lote: string) => {
    setSelectedLote(lote);
    setTimeout(() => onSelect(lote), 300);
  };

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
        <h2 className="text-white text-[24px] font-[800] mb-1">Quadra {quadra}</h2>
        <p className="text-[#9FE1CB] text-[14px]">Selecione o lote de destino</p>
      </div>

      <div className="flex-1 px-6 py-6 overflow-auto">
        <div className="grid grid-cols-4 gap-3">
          {lotes.map((lote) => (
            <button
              key={lote}
              onClick={() => handleLoteClick(lote)}
              className={`
                aspect-square rounded-[14px] flex items-center justify-center text-[16px] font-[700] border-2 transition-all
                ${
                  selectedLote === lote
                    ? 'bg-[#0B4F3A] text-white border-[#0B4F3A] scale-95'
                    : 'bg-white text-[#0B4F3A] border-[#E0E0DB] hover:border-[#5DCAA5] hover:bg-[#E1F5EE]'
                }
              `}
            >
              {lote}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
