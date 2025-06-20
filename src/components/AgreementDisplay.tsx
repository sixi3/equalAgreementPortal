'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { AgreementTemplate } from './AgreementTemplate';
import { Check } from '@/types';

interface AgreementDisplayProps {
  brandName: string;
  logoUrl?: string;
  selectedChecks: Check[];
  totalPrice: number;
}

export default function AgreementDisplay({ brandName, logoUrl, selectedChecks, totalPrice }: AgreementDisplayProps) {
  return (
    <div className="h-full w-auto bg-white/50 backdrop-blur-md max-w-full aspect-[210/297] shadow-lg">
        <PDFViewer width="100%" height="100%" showToolbar={false}>
            <AgreementTemplate 
                brandName={brandName}
                logoUrl={logoUrl}
                selectedChecks={selectedChecks}
                totalPrice={totalPrice}
            />
        </PDFViewer>
    </div>
  );
} 