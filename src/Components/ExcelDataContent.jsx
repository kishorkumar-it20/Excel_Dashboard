import React, { createContext, useContext, useState } from 'react';
const ExcelDataContext = createContext();

export const useExcelData = () => useContext(ExcelDataContext);

export const ExcelDataProvider = ({ children }) => {
  const [excelData, setExcelData] = useState(null);

  return (
    <ExcelDataContext.Provider value={{ excelData, setExcelData }}>
      {children}
    </ExcelDataContext.Provider>
  );
};
