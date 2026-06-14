import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import { getMapsLink } from '../data/getMapsLink';
import { LoginScreen } from './components/LoginScreen';
import { QuadraSelectionScreen } from './components/QuadraSelectionScreen';
import { LoteSelectionScreen } from './components/LoteSelectionScreen';
import { NavigationModeScreen } from './components/NavigationModeScreen';
import { MapNavigationScreen } from './components/MapNavigationScreen';
import { ArrivalScreen } from './components/ArrivalScreen';

type ScreenName = 'login' | 'quadra' | 'lote' | 'mode' | 'map' | 'arrival';

const SCREEN_ORDER: ScreenName[] = ['login', 'quadra', 'lote', 'mode', 'map', 'arrival'];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('login');
  const [direction, setDirection] = useState(1);
  const [cpf, setCpf] = useState('');
  const [selectedQuadra, setSelectedQuadra] = useState('');
  const [selectedLote, setSelectedLote] = useState('');
  const [entryTime, setEntryTime] = useState('');

  const navigateTo = (screen: ScreenName) => {
    const currentIndex = SCREEN_ORDER.indexOf(currentScreen);
    const nextIndex = SCREEN_ORDER.indexOf(screen);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentScreen(screen);
  };

  const handleLogin = (cpfValue: string) => {
    setCpf(cpfValue);
    const now = new Date();
    setEntryTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    navigateTo('quadra');
  };

  const handleQuadraSelect = (quadra: string) => {
    setSelectedQuadra(quadra);
    navigateTo('lote');
  };

  const handleLoteSelect = (lote: string) => {
    setSelectedLote(lote);
    navigateTo('mode');
  };

  const handleNavigationMode = (mode: 'sermil' | 'google' | 'waze') => {
    if (mode === 'sermil') {
      navigateTo('map');
      return;
    }
    if (mode === 'google') {
      const url = getMapsLink(selectedQuadra, selectedLote);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        toast.error('Rota indisponível', {
          description: `Ainda não há link do Google Maps para a Quadra ${selectedQuadra} — Lote ${selectedLote}.`,
        });
      }
    }
  };

  const handleArrival = () => {
    navigateTo('arrival');
  };

  const handleBack = () => {
    const backMap: Partial<Record<ScreenName, ScreenName>> = {
      quadra: 'login',
      lote: 'quadra',
      mode: 'lote',
      map: 'mode',
    };
    const prev = backMap[currentScreen];
    if (prev) navigateTo(prev);
  };

  const handleFinishVisit = () => {
    setDirection(-1);
    setCpf('');
    setSelectedQuadra('');
    setSelectedLote('');
    setCurrentScreen('login');
  };

  return (
    <div className="size-full flex items-center justify-center bg-[#E8EDE8]">
      <div className="w-full max-w-md h-full bg-white shadow-2xl relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentScreen}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.8 }}
            className="absolute inset-0"
          >
            {currentScreen === 'login' && <LoginScreen onContinue={handleLogin} />}
            {currentScreen === 'quadra' && <QuadraSelectionScreen onSelect={handleQuadraSelect} onBack={handleBack} />}
            {currentScreen === 'lote' && <LoteSelectionScreen quadra={selectedQuadra} onSelect={handleLoteSelect} onBack={handleBack} />}
            {currentScreen === 'mode' && <NavigationModeScreen quadra={selectedQuadra} lote={selectedLote} onSelectMode={handleNavigationMode} onBack={handleBack} />}
            {currentScreen === 'map' && <MapNavigationScreen quadra={selectedQuadra} lote={selectedLote} onArrival={handleArrival} onBack={handleBack} />}
            {currentScreen === 'arrival' && <ArrivalScreen entryTime={entryTime} onFinish={handleFinishVisit} onContinue={() => navigateTo('map')} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
