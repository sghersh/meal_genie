
import React, { createContext, useState, ReactNode } from 'react';

interface ReportContextProps {
  basicReport: string;
  detailedReport: string;
  setBasicReport: (newReport: string) => void;
  setDetailedReport: (newReport: string) => void;
}

const defaultContext: ReportContextProps = {
  basicReport: '',
  detailedReport: '',
  setBasicReport: () => {},
  setDetailedReport: () => {},
};

export const ReportContext = createContext<ReportContextProps>(defaultContext);

export const ReportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [basicReport, setBasicReport] = useState('');
  const [detailedReport, setDetailedReport] = useState('');

  return (
    <ReportContext.Provider value={{ basicReport, detailedReport, setBasicReport, setDetailedReport }}>
      {children}
    </ReportContext.Provider>
  );
};
