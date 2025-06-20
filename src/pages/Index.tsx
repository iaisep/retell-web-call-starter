
import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { ApiProvider } from '@/context/ApiContext';
import { useLanguage } from '@/context/LanguageContext';
import TestControlButton from '@/components/TestControlButton';
import CallStatusIndicator from '@/components/CallStatusIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const IndexContent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  // Default agent ID - you can make this configurable
  const agentId = "default-agent-id";

  const handleTest = () => {
    setIsRecording(!isRecording);
    setIsLoading(false);
    if (!isRecording) {
      setIsLoading(true);
      // Simulate loading state
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              Retell AI Calls
            </div>
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-8 text-center">
            {/* Title and subtitle */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                {t('title')}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Visual indicator */}
            <div className="mb-8">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isRecording 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                }`}></div>
                <div className="absolute inset-2 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full transition-all duration-300 ${
                    isRecording 
                      ? 'bg-red-500 animate-pulse' 
                      : 'bg-blue-500'
                  }`}></div>
                </div>
                
                {/* Ripple effect when recording */}
                {isRecording && (
                  <>
                    <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping"></div>
                    <div className="absolute -inset-2 rounded-full border border-red-300 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  </>
                )}
              </div>
            </div>

            {/* Status indicator */}
            <CallStatusIndicator 
              isRecording={isRecording} 
              isAgentTalking={isAgentTalking}
            />

            {/* Control button */}
            <div className="mb-6">
              <TestControlButton
                isRecording={isRecording}
                isLoading={isLoading}
                onTest={handleTest}
                agentId={agentId}
              />
            </div>

            {/* Instructions */}
            <div className="text-white/60 text-sm">
              {isRecording 
                ? "Click the button to end your call" 
                : "Click the button above to start your AI voice call"
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">
            Powered by Retell AI SDK
          </p>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <ApiProvider>
        <IndexContent />
      </ApiProvider>
    </LanguageProvider>
  );
};

export default Index;
