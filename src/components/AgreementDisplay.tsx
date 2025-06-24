'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { AgreementTemplate } from './AgreementTemplate';
import { useContext, useMemo } from 'react';
import { AgreementContext } from '@/lib/AgreementContext';

export default function AgreementDisplay() {
  const { state, dispatch } = useContext(AgreementContext);

  // Create a dependency key that changes whenever the PDF content changes.
  // This forces the PDFViewer to re-render when its key changes.
  const pdfKey = useMemo(() => JSON.stringify(state), [state]);

  return (
    <div className="h-full w-auto bg-white/50 backdrop-blur-md max-w-full aspect-[210/297] shadow-lg">
        <PDFViewer width="100%" height="100%" showToolbar={false} key={pdfKey}>
            <AgreementContext.Provider value={{ state, dispatch }}>
              <AgreementTemplate />
            </AgreementContext.Provider>
        </PDFViewer>
    </div>
  );
}