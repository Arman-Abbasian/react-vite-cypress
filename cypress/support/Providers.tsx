import React, { ReactNode } from 'react';
import { ThemeProvider } from '../../src/providers/ThemeProvider';


interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};