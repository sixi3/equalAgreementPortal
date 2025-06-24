"use client";

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header'
import { Card, CardContent } from '@/components/ui/card'
import ControlPanel from '@/components/ControlPanel'
import { idChecks, Check } from '@/lib/id-checks'
import dynamic from 'next/dynamic'
import { pdf } from '@react-pdf/renderer'
import { AgreementTemplate } from '@/components/AgreementTemplate'
import { Journey } from '@/types'
import { JourneyBuilderModal } from '@/components/JourneyBuilderModal'
import { motion, AnimatePresence } from 'framer-motion'
import { EditPriceModal } from '@/components/EditPriceModal'
import { MultiplierInputModal } from '@/components/MultiplierInputModal'
import { AdditionalCostsModal } from '@/components/AdditionalCostsModal'
import { Button } from '@/components/ui/button'

const AgreementDisplay = dynamic(() => import('@/components/AgreementDisplay'), {
  ssr: false,
  loading: () => <p>Loading PDF preview...</p>,
});

const SPECIAL_CHECKS = {
  'Highest Education*': 'Education',
  'Employment & Conduct (Per check) - Last 7 years': 'Employment',
};

const DEFAULT_SETUP_FEE = 1000000;
const DEFAULT_ANNUAL_FEE = 1200000;

// Helper to get the price of a check, using override and multiplier if they exist
function getCheckPrice(checkName: string, priceOverrides: { [key: string]: number }, multipliers: { [key: string]: number }): number {
  const basePrice = priceOverrides[checkName] !== undefined
    ? priceOverrides[checkName]
    : (() => {
        for (const category in idChecks) {
          const check = idChecks[category as keyof typeof idChecks].find(c => c.name === checkName);
          if (check) return check.price;
        }
        return 0;
      })();
  const multiplier = multipliers[checkName] || 1;
  return basePrice * multiplier;
}

interface PreviewData {
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

export default function Home() {
  // State for journeys
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [editingJourney, setEditingJourney] = useState<Journey | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceOverrides, setPriceOverrides] = useState<{ [key: string]: number }>({});
  const [editingCheck, setEditingCheck] = useState<{ name: string; price: number } | null>(null);
  const [multipliers, setMultipliers] = useState<{ [key: string]: number }>({});
  const [editingMultiplier, setEditingMultiplier] = useState<{ name: string; label: string; defaultValue: number } | null>(null);
  const [setupFee, setSetupFee] = useState(DEFAULT_SETUP_FEE);
  const [annualFee, setAnnualFee] = useState(DEFAULT_ANNUAL_FEE);
  const [isCostsModalOpen, setIsCostsModalOpen] = useState(false);

  // Live state updated by ControlPanel (now used for the modal)
  const [brandName, setBrandName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);

  // Derived live state
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // FLATTENED data for PDF preview and total price calculation.
  // This combines all selected checks from all journeys.
  const allSelectedChecks = useMemo(() => {
    const combinedChecks: { [key: string]: boolean } = {};
    journeys.forEach(journey => {
      Object.assign(combinedChecks, journey.selectedChecks);
    });
    return combinedChecks;
  }, [journeys]);

  const selectedCheckDetails = useMemo(() => {
    return Object.keys(allSelectedChecks)
      .filter(name => allSelectedChecks[name])
      .map(name => {
        for (const category in idChecks) {
          const check = idChecks[category as keyof typeof idChecks].find(c => c.name === name);
          if (check) {
            return {
              ...check,
              price: getCheckPrice(name, priceOverrides, multipliers),
            };
          }
        }
        return null;
      })
      .filter((c): c is Check => c !== null);
  }, [allSelectedChecks, priceOverrides, multipliers]);

  const totalPrice = useMemo(() => {
    return selectedCheckDetails.reduce((acc, check) => acc + check.price, 0);
  }, [selectedCheckDetails]);

  // State for the preview pane
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isClient, setIsClient] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  useEffect(() => {
    setIsClient(true)

    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    // Set initial preview data
    setPreviewData({
      brandName,
      logoUrl: logoUrl || undefined,
      journeys,
      totalPrice,
      priceOverrides,
      multipliers,
      setupFee,
      annualFee,
      defaultSetupFee: DEFAULT_SETUP_FEE,
      defaultAnnualFee: DEFAULT_ANNUAL_FEE,
    });

    return () => window.removeEventListener('resize', checkIsMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to bottom on desktop after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom on desktop when checks change
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [selectedCheckDetails]);

  // Effect to generate logo data URL
  useEffect(() => {
    if (logo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(logo);
    } else {
      setLogoUrl(null);
    }
  }, [logo]);

  // Effect to track if changes have been made
  useEffect(() => {
    setHasChanges(true);
  }, [brandName, logoUrl, journeys, priceOverrides]);

  const handleSaveJourney = (journeyName: string, checks: { [key: string]: boolean }) => {
    const journeyPrice = Object.keys(checks)
      .filter(name => checks[name])
      .reduce((acc, name) => acc + getCheckPrice(name, priceOverrides, multipliers), 0);

    const newJourney: Journey = {
      id: new Date().toISOString(),
      name: journeyName,
      selectedChecks: checks,
      totalPrice: journeyPrice,
    };

    setJourneys(prev => [...prev, newJourney]);
  };

  const handleDeleteJourney = (id: string) => {
    setJourneys(prev => prev.filter(j => j.id !== id));
  };

  const handleUpdateJourney = (id: string, updatedName: string, updatedChecks: { [key: string]: boolean }) => {
    const journeyPrice = Object.keys(updatedChecks)
      .filter(name => updatedChecks[name])
      .reduce((acc, name) => acc + getCheckPrice(name, priceOverrides, multipliers), 0);

    setJourneys(prev => prev.map(j => 
      j.id === id 
        ? { ...j, name: updatedName, selectedChecks: updatedChecks, totalPrice: journeyPrice }
        : j
    ));
    setEditingJourney(null);
  };

  const openJourneyModal = (journey: Journey | null) => {
    setEditingJourney(journey);
    setIsModalOpen(true);
  };

  const closeJourneyModal = () => {
    setEditingJourney(null);
    setIsModalOpen(false);
  }

  const handleOpenPriceModal = (checkName: string, currentPrice: number) => {
    setEditingCheck({ name: checkName, price: currentPrice });
  };

  const handleClosePriceModal = () => {
    setEditingCheck(null);
  };

  const handleSavePrice = (checkName: string, newPrice: number) => {
    setPriceOverrides(prev => ({ ...prev, [checkName]: newPrice }));
  };

  const handleOpenMultiplierModal = (checkName: string) => {
    setEditingMultiplier({
      name: checkName,
      label: (SPECIAL_CHECKS as any)[checkName] || checkName,
      defaultValue: multipliers[checkName] || 1,
    });
  };

  const handleCloseMultiplierModal = () => {
    setEditingMultiplier(null);
  };

  const handleSaveMultiplier = (checkName: string, multiplier: number) => {
    setMultipliers(prev => ({ ...prev, [checkName]: multiplier }));
  };

  const handleSaveAdditionalCosts = ({ setupFee, annualFee }: { setupFee: number; annualFee: number }) => {
    setSetupFee(setupFee);
    setAnnualFee(annualFee);
  };

  useEffect(() => {
    if (previewData) {
      handlePreviewUpdate();
    }
  }, [setupFee, annualFee]);

  const handlePreviewUpdate = async () => {
    setIsPreviewLoading(true);

    if (isMobile) {
      const currentData = {
        brandName,
        logoUrl: logoUrl || undefined,
        journeys,
        totalPrice,
        priceOverrides,
        multipliers,
        setupFee,
        annualFee,
        defaultSetupFee: DEFAULT_SETUP_FEE,
        defaultAnnualFee: DEFAULT_ANNUAL_FEE,
      };
      const blob = await pdf((
        <AgreementTemplate 
          brandName={currentData.brandName}
          logoUrl={currentData.logoUrl || undefined}
          journeys={currentData.journeys}
          totalPrice={currentData.totalPrice}
          priceOverrides={currentData.priceOverrides}
          multipliers={currentData.multipliers}
          setupFee={currentData.setupFee}
          annualFee={currentData.annualFee}
          defaultSetupFee={currentData.defaultSetupFee}
          defaultAnnualFee={currentData.defaultAnnualFee}
        />
      )).toBlob();
      
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setIsPreviewLoading(false);

    } else {
      // Use a short timeout to allow the UI to update and show the loader
      setTimeout(() => {
        setPreviewData({
          brandName,
          logoUrl: logoUrl || undefined,
          journeys,
          totalPrice,
          priceOverrides,
          multipliers,
          setupFee,
          annualFee,
          defaultSetupFee: DEFAULT_SETUP_FEE,
          defaultAnnualFee: DEFAULT_ANNUAL_FEE,
        });
        setHasChanges(false);
        setIsPreviewLoading(false);
      }, 100); // 100ms timeout
    }
  };

  const handleDownload = async () => {
    // Always use the latest data for download
    const currentData = {
      brandName,
      logoUrl,
      journeys,
      totalPrice,
      priceOverrides,
      multipliers,
      setupFee,
      annualFee,
      defaultSetupFee: DEFAULT_SETUP_FEE,
      defaultAnnualFee: DEFAULT_ANNUAL_FEE,
    };

    const blob = await pdf((
      <AgreementTemplate 
        brandName={currentData.brandName}
        logoUrl={currentData.logoUrl || undefined}
        journeys={currentData.journeys}
        totalPrice={currentData.totalPrice}
        priceOverrides={currentData.priceOverrides}
        multipliers={currentData.multipliers}
        setupFee={currentData.setupFee}
        annualFee={currentData.annualFee}
        defaultSetupFee={currentData.defaultSetupFee}
        defaultAnnualFee={currentData.defaultAnnualFee}
      />
    )).toBlob();
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Agreement.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen dotted-grid bg-gray-50">
      <Header />
      
      <main className="mx-auto py-4 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Control Panel - Left Side */}
          <AnimatePresence>
            <motion.div
              key="control-panel"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <ControlPanel 
                brandName={brandName}
                setBrandName={setBrandName}
                logo={logo}
                setLogo={setLogo}
                journeys={journeys}
                onDeleteJourney={handleDeleteJourney}
                onOpenModal={openJourneyModal}
                totalPrice={totalPrice}
                onDownload={handleDownload}
                onPreview={handlePreviewUpdate}
                hasChanges={hasChanges}
                isPreviewLoading={isPreviewLoading}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* PDF Preview - Right Side */}
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
                    <h3 className="text-[14px] font-medium tracking-widest text-slate-500">PDF PREVIEW</h3>
                    <Button variant="outline" size="sm" onClick={() => setIsCostsModalOpen(true)}>
                      Edit Additional Costs
                    </Button>
                  </div>
                </div>
                <CardContent className="flex-1 w-full flex items-center justify-center py-6">
                  {isClient && previewData ? (
                    <AgreementDisplay
                      brandName={previewData.brandName}
                      logoUrl={previewData.logoUrl}
                      journeys={previewData.journeys}
                      totalPrice={previewData.totalPrice}
                      priceOverrides={previewData.priceOverrides}
                      multipliers={previewData.multipliers}
                      setupFee={previewData.setupFee}
                      annualFee={previewData.annualFee}
                      defaultSetupFee={previewData.defaultSetupFee}
                      defaultAnnualFee={previewData.defaultAnnualFee}
                    />
                  ) : (
                    <p className="text-muted-foreground">Click 'Preview' to see your agreement</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <JourneyBuilderModal
        isOpen={isModalOpen}
        onClose={closeJourneyModal}
        onSaveJourney={handleSaveJourney}
        onUpdateJourney={handleUpdateJourney}
        journeyToEdit={editingJourney}
        journeys={journeys}
        priceOverrides={priceOverrides}
        onEditPrice={handleOpenPriceModal}
        onSpecialCheckSelect={handleOpenMultiplierModal}
        multipliers={multipliers}
      />
      <EditPriceModal
        isOpen={!!editingCheck}
        onClose={handleClosePriceModal}
        onSave={(newPrice: number) => {
          if (editingCheck) {
            handleSavePrice(editingCheck.name, newPrice);
          }
        }}
        checkName={editingCheck?.name || ''}
        originalPrice={editingCheck?.price || 0}
      />
      <MultiplierInputModal
        isOpen={!!editingMultiplier}
        onClose={handleCloseMultiplierModal}
        onSave={(multiplier) => {
          if (editingMultiplier) {
            handleSaveMultiplier(editingMultiplier.name, multiplier);
          }
        }}
        checkName={editingMultiplier?.name || ''}
        defaultValue={editingMultiplier?.defaultValue || 1}
        label={editingMultiplier?.label || ''}
      />
      <AdditionalCostsModal
        isOpen={isCostsModalOpen}
        onClose={() => setIsCostsModalOpen(false)}
        onSave={handleSaveAdditionalCosts}
        defaultSetupFee={setupFee}
        defaultAnnualFee={annualFee}
      />
    </div>
  )
} 