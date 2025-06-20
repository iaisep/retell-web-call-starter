
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
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 border ${
        isRecording 
          ? 'bg-red-50 text-red-700 border-red-200' 
          : 'bg-gray-50 text-gray-600 border-gray-200'
      }`}>
        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
          isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
        }`} />
        <span className="text-sm font-medium">
          {isRecording ? t('call_active') : t('call_inactive')}
        </span>
      </div>
      
      {isRecording && (
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 border ${
          isAgentTalking 
            ? 'bg-red-50 text-red-700 border-red-200' 
            : 'bg-gray-50 text-gray-600 border-gray-200'
        }`}>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isAgentTalking ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
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
