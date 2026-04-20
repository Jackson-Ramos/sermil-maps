import { MapPin, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArrivalScreenProps {
  entryTime: string;
  onFinish: () => void;
  onContinue: () => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};

export function ArrivalScreen({ entryTime, onFinish, onContinue }: ArrivalScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#F7F7F5] px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-sm"
      >
        {/* Ícone central — pino de localização (neutro, não confirma antes de ler) */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <div className="relative">
            {/* Anel pulsante */}
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-[#1D9E75] rounded-full"
            />
            <div className="w-24 h-24 bg-[#E1F5EE] border-4 border-[#1D9E75] rounded-full flex items-center justify-center relative">
              <MapPin className="w-12 h-12 text-[#0B4F3A]" />
            </div>
          </div>
        </motion.div>

        {/* Título */}
        <motion.h2
          variants={fadeUp}
          className="text-[#0B4F3A] text-[26px] font-[800] text-center mb-3 leading-tight"
        >
          Você chegou ao destino?
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          variants={fadeUp}
          className="text-[#6B9E8A] text-[14px] text-center mb-8 leading-relaxed"
        >
          Ao confirmar, sua visita será encerrada e o tempo de permanência registrado.
        </motion.p>

        {/* Badge de tempo */}
        <motion.div
          variants={fadeUp}
          className="bg-white border-2 border-[#E0E0DB] rounded-[16px] p-4 mb-8 shadow-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-[#1D9E75]" />
            <p className="text-[#0B4F3A] text-[14px]">
              <span className="font-[700]">Entrada:</span>{' '}
              {entryTime} · 4 min atrás
            </p>
          </div>
        </motion.div>

        {/* Botões */}
        <motion.div variants={fadeUp} className="space-y-3">
          {/* Botão principal — check visível AQUI para confirmar a ação */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onFinish}
            className="w-full bg-[#0B4F3A] text-white py-4 rounded-[16px] text-[16px] font-[700] hover:bg-[#0F6E56] transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <CheckCircle className="w-5 h-5 text-[#5DCAA5]" />
            Sim, cheguei — encerrar visita
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            className="w-full bg-transparent border-2 border-[#C8D8D4] text-[#0B4F3A] py-4 rounded-[16px] text-[16px] font-[700] hover:bg-[#E1F5EE] hover:border-[#1D9E75] transition-all"
          >
            Ainda estou navegando
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
