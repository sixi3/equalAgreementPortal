'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { AgreementTemplate } from './AgreementTemplate';
import { Journey } from '@/types';

interface AgreementDisplayProps {
  brandName: string;
  logoUrl?: string;
  journeys: Journey[];
  totalPrice: number;
  priceOverrides: { [key: string]: number };
  multipliers: { [key: string]: number };
  setupFee: number;
  annualFee: number;
  defaultSetupFee: number;
  defaultAnnualFee: number;
}

export default function AgreementDisplay({ brandName, logoUrl, journeys, totalPrice, priceOverrides, multipliers, setupFee, annualFee, defaultSetupFee, defaultAnnualFee }: AgreementDisplayProps) {
  return (
    <div className="h-full w-auto bg-white/50 backdrop-blur-md max-w-full aspect-[210/297] shadow-lg">
        <PDFViewer width="100%" height="100%" showToolbar={false}>
            <AgreementTemplate 
                brandName={brandName}
                logoUrl={logoUrl}
                journeys={journeys}
                totalPrice={totalPrice}
                priceOverrides={priceOverrides}
                multipliers={multipliers}
                setupFee={setupFee}
                annualFee={annualFee}
                defaultSetupFee={defaultSetupFee}
                defaultAnnualFee={defaultAnnualFee}
            />
        </PDFViewer>
    </div>
  );
} 