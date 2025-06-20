"use client";

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header'
import { Card, CardContent } from '@/components/ui/card'
import ControlPanel from '@/components/ControlPanel'
import { idChecks, Check } from '@/lib/id-checks'
import dynamic from 'next/dynamic'
import { pdf } from '@react-pdf/renderer'
import { AgreementTemplate } from '@/components/AgreementTemplate'

const AgreementDisplay = dynamic(() => import('@/components/AgreementDisplay'), {
  ssr: false,
  loading: () => <p>Loading PDF preview...</p>,
});

interface PreviewData {
  brandName: string;
  logoUrl?: string;
  selectedChecks: Check[];
  totalPrice: number;
}

export default function Home() {
  // Live state updated by ControlPanel
  const [selectedChecks, setSelectedChecks] = useState<{ [key: string]: boolean }>({})
  const [brandName, setBrandName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);

  // Derived live state
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const selectedCheckDetails = useMemo(() => {
    return Object.keys(selectedChecks)
      .filter(name => selectedChecks[name])
      .map(name => {
        for (const category in idChecks) {
          const check = idChecks[category as keyof typeof idChecks].find(c => c.name === name);
          if (check) return check;
        }
        return null;
      })
      .filter(Boolean) as Check[];
  }, [selectedChecks]);

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
      selectedChecks: selectedCheckDetails,
      totalPrice
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
  }, [selectedChecks]);

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
  }, [brandName, logoUrl, selectedChecks]);

  const handlePreviewUpdate = async () => {
    setIsPreviewLoading(true);

    if (isMobile) {
      const currentData = {
        brandName,
        logoUrl,
        selectedChecks: selectedCheckDetails,
        totalPrice,
      };
      const blob = await pdf((
        <AgreementTemplate 
          brandName={currentData.brandName}
          logoUrl={currentData.logoUrl || undefined}
          selectedChecks={currentData.selectedChecks}
          totalPrice={currentData.totalPrice}
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
          selectedChecks: selectedCheckDetails,
          totalPrice
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
      selectedChecks: selectedCheckDetails,
      totalPrice,
    };

    const blob = await pdf((
      <AgreementTemplate 
        brandName={currentData.brandName}
        logoUrl={currentData.logoUrl || undefined}
        selectedChecks={currentData.selectedChecks}
        totalPrice={currentData.totalPrice}
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
          <ControlPanel 
            brandName={brandName}
            setBrandName={setBrandName}
            logo={logo}
            setLogo={setLogo}
            selectedChecks={selectedChecks}
            setSelectedChecks={setSelectedChecks}
            totalPrice={totalPrice}
            selectedCheckNames={Object.keys(selectedChecks).filter(name => selectedChecks[name])}
            onDownload={handleDownload}
            onPreview={handlePreviewUpdate}
            hasChanges={hasChanges}
            isPreviewLoading={isPreviewLoading}
          />
          
          {/* PDF Preview - Right Side */}
          <div className="hidden lg:block">
            <Card className="h-full">
               <CardContent className="h-full w-full flex rounded-lg items-center justify-center py-8">
                 {isClient && previewData ? (
                   <AgreementDisplay
                     brandName={previewData.brandName}
                     logoUrl={previewData.logoUrl}
                     selectedChecks={previewData.selectedChecks}
                     totalPrice={previewData.totalPrice}
                   />
                 ) : (
                   <p className="text-muted-foreground">Click 'Preview' to see your agreement</p>
                 )}
               </CardContent>
             </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 