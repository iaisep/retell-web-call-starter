
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface CallStatusIndicatorProps {
  isRecording: boolean;
  isAgentTalking?: boolean;
}

const CallStatusIndicator: React.FC<CallStatusIndicatorProps> = ({ 
  isRecording, 
  isAgentTalking = false 
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
        isRecording ? 'bg-red-100/90 text-red-800 border border-red-200' : 'bg-yellow-100/90 text-yellow-800 border border-yellow-200'
      }`}>
        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
          isRecording ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
        }`} />
        <span className="text-sm font-medium">
          {isRecording ? t('call_active') : t('call_inactive')}
        </span>
      </div>
      
      {isRecording && (
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 border ${
          isAgentTalking 
            ? 'bg-red-100/90 text-red-800 border-red-200' 
            : 'bg-yellow-100/90 text-yellow-800 border-yellow-200'
        }`}>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isAgentTalking ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
          }`} />
          <span className="text-sm font-medium">
            {isAgentTalking ? t('agent_talking') : t('ready_to_talk')}
          </span>
        </div>
      )}
    </div>
  );
};

export default CallStatusIndicator;
