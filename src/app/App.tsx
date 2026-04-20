import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { QuadraSelectionScreen } from './components/QuadraSelectionScreen';
import { LoteSelectionScreen } from './components/LoteSelectionScreen';
import { NavigationModeScreen } from './components/NavigationModeScreen';
import { MapNavigationScreen } from './components/MapNavigationScreen';
import { ArrivalScreen } from './components/ArrivalScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'quadra' | 'lote' | 'mode' | 'map' | 'arrival'>('login');
  const [cpf, setCpf] = useState('');
  const [selectedQuadra, setSelectedQuadra] = useState('');
  const [selectedLote, setSelectedLote] = useState('');
  const [entryTime, setEntryTime] = useState('');

  const handleLogin = (cpfValue: string) => {
    setCpf(cpfValue);
    setEntryTime('09:41');
    setCurrentScreen('quadra');
  };

  const handleQuadraSelect = (quadra: string) => {
    setSelectedQuadra(quadra);
    setCurrentScreen('lote');
  };

  const handleLoteSelect = (lote: string) => {
    setSelectedLote(lote);
    setCurrentScreen('mode');
  };

  const handleNavigationMode = (mode: 'sermil' | 'google' | 'waze') => {
    if (mode === 'sermil') {
      setCurrentScreen('map');
    }
  };

  const handleArrival = () => {
    setCurrentScreen('arrival');
  };

  const handleBack = () => {
    if (currentScreen === 'quadra') setCurrentScreen('login');
    if (currentScreen === 'lote') setCurrentScreen('quadra');
    if (currentScreen === 'mode') setCurrentScreen('lote');
    if (currentScreen === 'map') setCurrentScreen('mode');
  };

  const handleFinishVisit = () => {
    setCurrentScreen('login');
    setCpf('');
    setSelectedQuadra('');
    setSelectedLote('');
  };

  return (
    <div className="size-full flex items-center justify-center bg-[#F7F7F5]">
      <div className="w-full max-w-md h-full bg-white shadow-2xl relative overflow-hidden">
        {currentScreen === 'login' && <LoginScreen onContinue={handleLogin} />}
        {currentScreen === 'quadra' && <QuadraSelectionScreen onSelect={handleQuadraSelect} onBack={handleBack} />}
        {currentScreen === 'lote' && <LoteSelectionScreen quadra={selectedQuadra} onSelect={handleLoteSelect} onBack={handleBack} />}
        {currentScreen === 'mode' && <NavigationModeScreen quadra={selectedQuadra} lote={selectedLote} onSelectMode={handleNavigationMode} onBack={handleBack} />}
        {currentScreen === 'map' && <MapNavigationScreen quadra={selectedQuadra} lote={selectedLote} onArrival={handleArrival} onBack={handleBack} />}
        {currentScreen === 'arrival' && <ArrivalScreen entryTime={entryTime} onFinish={handleFinishVisit} onContinue={() => setCurrentScreen('map')} />}
      </div>
    </div>
  );
}
