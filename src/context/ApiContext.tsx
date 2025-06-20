
import React, { createContext, useContext, ReactNode } from 'react';

interface ApiContextType {
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const fetchWithAuth = async (url: string, options?: RequestInit): Promise<Response> => {
    // Simple fetch wrapper - can be extended with auth logic
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  };

  return (
    <ApiContext.Provider value={{ fetchWithAuth }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
};
