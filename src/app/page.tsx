"use client";

import { useEffect, useMemo, useContext, useState } from 'react';
import Header from '@/components/Header'
import { Card, CardContent } from '@/components/ui/card'
import ControlPanel from '@/components/ControlPanel'
import { Check } from '@/lib/id-checks'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { JourneyBuilderModal } from '@/components/JourneyBuilderModal'
import { EditPriceModal } from '@/components/EditPriceModal'
import { MultiplierInputModal } from '@/components/MultiplierInputModal'
import { AdditionalCostsModal } from '@/components/AdditionalCostsModal'
import { Button } from '@/components/ui/button'
import { AgreementContext } from '@/lib/AgreementContext';
import { Loader2 } from 'lucide-react';

const AgreementDisplay = dynamic(() => import('@/components/AgreementDisplay'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full w-full"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>,
});

const SPECIAL_CHECKS = {
  'Highest Education*': 'Education',
  'Employment & Conduct (Per check) - Last 7 years': 'Employment',
};

const DEFAULT_SETUP_FEE = 1000000;
const DEFAULT_ANNUAL_FEE = 1200000;

interface PreviewData {
  brandName: string;
  logoUrl?: string;
  journeys: any[];
  totalPrice: number;
  priceOverrides: { [key: string]: number };
  multipliers: { [key: string]: number };
  setupFee: number;
  annualFee: number;
  defaultSetupFee: number;
  defaultAnnualFee: number;
}

export default function Home() {
  const { state, dispatch } = useContext(AgreementContext);
  const { journeys, brandName } = state;

  const [isClient, setIsClient] = useState(false)

  // Derived calculations
  const totalPrice = useMemo(() => {
    return journeys.reduce((acc, journey) => acc + journey.totalPrice, 0);
  }, [journeys]);

  useEffect(() => {
    setIsClient(true)
  }, []);

  const handleDownload = async () => {
    const { pdf } = await import('@react-pdf/renderer');
    const { AgreementTemplate } = await import('@/components/AgreementTemplate');

    // Create a new temporary state provider for the download to ensure it has all the data
    const blob = await pdf(
      <AgreementContext.Provider value={{ state, dispatch }}>
          <AgreementTemplate />
      </AgreementContext.Provider>
    ).toBlob();
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeBrandName = brandName.replace(/[^a-zA-Z0-9]/g, '_') || 'Agreement';
    link.download = `Equal_Digital_Agreement_${safeBrandName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen dotted-grid bg-gray-50">
      <Header />
      
      <main className="mx-auto py-4 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence>
            <motion.div
              key="control-panel"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <ControlPanel 
                totalPrice={totalPrice}
                onDownload={handleDownload}
              />
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence>
            <motion.div
              key="pdf-preview"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="hidden lg:block"
            >
              <Card className="h-full flex flex-col">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[14px] font-medium tracking-widest text-slate-500">LIVE PREVIEW</h3>
                    <Button variant="outline" size="sm" onClick={() => dispatch({ type: 'OPEN_COSTS_MODAL' })}>
                      Edit PDF
                    </Button>
                  </div>
                </div>
                <CardContent className="flex-1 w-full flex items-center justify-center py-6">
                  {isClient ? (
                    <AgreementDisplay />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <JourneyBuilderModal />
      <EditPriceModal />
      <MultiplierInputModal />
      <AdditionalCostsModal />
    </div>
  )
} 