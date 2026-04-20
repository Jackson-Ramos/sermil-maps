import { ArrowLeft, ChevronRight, MapPin } from 'lucide-react';

interface QuadraSelectionScreenProps {
  onSelect: (quadra: string) => void;
  onBack: () => void;
}

const quadras = [
  { id: 'A', name: 'Quadra A', lotes: '(Lotes 01-30)' },
  { id: 'B', name: 'Quadra B', lotes: '(Lotes 31-60)' },
  { id: 'C', name: 'Quadra C', lotes: '(Lotes 61-90)' },
  { id: 'D', name: 'Quadra D', lotes: '(Lotes 91-120)' },
];

export function QuadraSelectionScreen({ onSelect, onBack }: QuadraSelectionScreenProps) {
  return (
    <div className="h-full flex flex-col bg-[#F7F7F5]">
      <div className="bg-white border-b border-[#E0E0DB] px-4 py-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-[#0F6E56]">9:41</span>
          <span className="text-[11px] text-[#5DCAA5] font-[700]">Entrada registrada ✓</span>
        </div>
      </div>

      <div className="bg-[#0B4F3A] px-6 py-6">
        <button onClick={onBack} className="flex items-center gap-2 mb-4 text-[#9FE1CB]">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px] font-[700]">Voltar</span>
        </button>
        <h2 className="text-white text-[24px] font-[800] mb-1">Qual é o destino?</h2>
        <p className="text-[#9FE1CB] text-[14px]">Selecione a quadra</p>
      </div>

      <div className="flex-1 px-6 py-6 space-y-3">
        {quadras.map((quadra) => (
          <button
            key={quadra.id}
            onClick={() => onSelect(quadra.id)}
            className="w-full bg-white border-2 border-[#E0E0DB] rounded-[16px] p-4 flex items-center justify-between hover:bg-[#E1F5EE] hover:border-[#5DCAA5] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E1F5EE] rounded-[12px] flex items-center justify-center group-hover:bg-[#5DCAA5]">
                <MapPin className="w-6 h-6 text-[#0F6E56] group-hover:text-white" />
              </div>
              <div className="text-left">
                <p className="text-[#0B4F3A] text-[16px] font-[700]">{quadra.name}</p>
                <p className="text-[#0F6E56] text-[12px]">{quadra.lotes}</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#E0E0DB] group-hover:text-[#5DCAA5]" />
          </button>
        ))}
      </div>
    </div>
  );
}
