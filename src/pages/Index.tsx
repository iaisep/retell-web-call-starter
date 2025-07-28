
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

  // Specific agent ID for the calls
  const agentId = "agent_7d3916f5c7bbf9e0aa8855ec42";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background decoration with subtle pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23DC2626%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Header with logo */}
      <div className="relative z-10 pt-6 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/dfec7981-c597-45a7-b889-9a6d04b51fbd.png" 
                alt="BIOFOM Logo" 
                className="h-12 w-auto"
              />
              <div className="text-2xl font-bold text-gray-800">
                TotalContact AI Calls
              </div>
            </div>
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="bg-white/80 border-red-200 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl shadow-red-500/10">
          <CardContent className="p-8 text-center">
            {/* Title and subtitle */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {t('title')}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Visual indicator */}
            <div className="mb-8">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isRecording 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse shadow-lg shadow-red-500/30' 
                    : 'bg-gradient-to-r from-gray-300 to-gray-400 shadow-lg shadow-gray-400/30'
                }`}></div>
                <div className="absolute inset-2 rounded-full bg-white/90 backdrop-blur flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full transition-all duration-300 ${
                    isRecording 
                      ? 'bg-red-600 animate-pulse shadow-inner' 
                      : 'bg-gray-500 shadow-inner'
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
            <div className="text-gray-500 text-sm">
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
          <p className="text-gray-400 text-sm">
            Powered by TotalContact AI SDK
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
