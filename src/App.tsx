import React, { useState } from 'react';
import { CameraComponent } from './components/Camera';
import { ARView } from './components/ARView';
import { LanguageSelector } from './components/LanguageSelector';
import { LandingPage } from './components/LandingPage.tsx';
import { Language, indianLanguages } from './types/languages';

function App() {
  const [detections, setDetections] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(indianLanguages[0]);
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  return (
    <div className="relative h-screen">
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
      <CameraComponent onDetections={setDetections} />
      <ARView detections={detections} selectedLanguage={selectedLanguage} />
    </div>
  );
}

export default App;