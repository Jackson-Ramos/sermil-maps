import { CheckCircle, Clock } from 'lucide-react';

interface ArrivalScreenProps {
  entryTime: string;
  onFinish: () => void;
  onContinue: () => void;
}

export function ArrivalScreen({ entryTime, onFinish, onContinue }: ArrivalScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#F7F7F5] px-8">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[#0B4F3A] rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </div>

        <h2 className="text-[#0B4F3A] text-[24px] font-[800] text-center mb-3">
          Você chegou ao destino?
        </h2>

        <p className="text-[#0F6E56] text-[14px] text-center mb-8">
          Ao confirmar, sua visita será encerrada e o tempo de permanência registrado
        </p>

        <div className="bg-white border-2 border-[#E0E0DB] rounded-[16px] p-4 mb-8">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-[#0F6E56]" />
            <p className="text-[#0F6E56] text-[14px]">
              <span className="font-[700]">Entrada:</span> {entryTime} · 4 min atrás
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onFinish}
            className="w-full bg-[#0B4F3A] text-white py-4 rounded-[16px] text-[16px] font-[700] hover:bg-[#0F6E56] transition-colors"
          >
            Sim, cheguei — encerrar visita
          </button>

          <button
            onClick={onContinue}
            className="w-full bg-transparent border-2 border-[#0B4F3A] text-[#0B4F3A] py-4 rounded-[16px] text-[16px] font-[700] hover:bg-[#E1F5EE] transition-colors"
          >
            Ainda estou navegando
          </button>
        </div>
      </div>
    </div>
  );
}
