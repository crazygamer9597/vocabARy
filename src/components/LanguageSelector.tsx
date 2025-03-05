import React from 'react';
import { Language, indianLanguages } from '../types/languages';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="fixed top-4 right-4 z-10">
      <select
        className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-lg"
        value={selectedLanguage.code}
        onChange={(e) => {
          const language = indianLanguages.find(lang => lang.code === e.target.value);
          if (language) onLanguageChange(language);
        }}
      >
        {indianLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name} ({language.nativeName})
          </option>
        ))}
      </select>
    </div>
  );
}