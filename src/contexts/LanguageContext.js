import React, { createContext, useState, useContext } from 'react';

// Context 생성
const LanguageContext = createContext();

// Provider 컴포넌트 생성
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 기본값 영어

  const toggleLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// LanguageContext 사용하기 위한 Hook
export const useLanguage = () => {
  return useContext(LanguageContext);
};
