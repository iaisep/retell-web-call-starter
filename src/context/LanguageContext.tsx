
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'title': 'AI Voice Calls',
    'subtitle': 'Experience the future of voice interaction with our AI-powered calling system',
    'test': 'Start Call',
    'Colgar': 'End Call',
    'ending_call': 'Ending call...',
    'error_in_call': 'Error in call',
    'error_ending_call': 'Error ending call',
    'error_creating_call': 'Error creating call',
    'agent_talking': 'Agent is talking...',
    'ready_to_talk': 'Ready to talk',
    'call_active': 'Call Active',
    'call_inactive': 'Call Inactive'
  },
  es: {
    'title': 'Llamadas de Voz IA',
    'subtitle': 'Experimenta el futuro de la interacción por voz con nuestro sistema de llamadas potenciado por IA',
    'test': 'Iniciar Llamada',
    'Colgar': 'Colgar',
    'ending_call': 'Finalizando llamada...',
    'error_in_call': 'Error en la llamada',
    'error_ending_call': 'Error al finalizar llamada',
    'error_creating_call': 'Error al crear llamada',
    'agent_talking': 'El agente está hablando...',
    'ready_to_talk': 'Listo para hablar',
    'call_active': 'Llamada Activa',
    'call_inactive': 'Llamada Inactiva'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
