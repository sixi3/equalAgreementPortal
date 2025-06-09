'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { AgreementPreview } from './AgreementPreview';

interface AgreementDisplayProps {
  brandName: string;
  logoUrl: string | null;
  selectedChecks: { name: string; price: number; tat: string; method: string }[];
  totalPrice: number;
}

export default function AgreementDisplay({ brandName, logoUrl, selectedChecks, totalPrice }: AgreementDisplayProps) {
  return (
    <div className="h-full w-auto max-w-full aspect-[210/297] shadow-lg bg-white">
        <PDFViewer width="100%" height="100%" showToolbar={false}>
            <AgreementPreview 
                brandName={brandName}
                logoUrl={logoUrl}
                selectedChecks={selectedChecks}
                totalPrice={totalPrice}
            />
        </PDFViewer>
    </div>
  );
} 