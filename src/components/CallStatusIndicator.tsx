
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
        isRecording ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
      }`}>
        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
          isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
        }`} />
        <span className="text-sm font-medium">
          {isRecording ? t('call_active') : t('call_inactive')}
        </span>
      </div>
      
      {isRecording && (
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
          isAgentTalking ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isAgentTalking ? 'bg-blue-500 animate-pulse' : 'bg-green-500'
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
