"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ControlPanel from '@/components/ControlPanel'
import { idChecks } from '@/lib/id-checks'
import dynamic from 'next/dynamic'
import { pdf } from '@react-pdf/renderer'
import { AgreementPreview } from '@/components/AgreementPreview';

const AgreementDisplay = dynamic(() => import('@/components/AgreementDisplay'), {
  ssr: false,
  loading: () => <p>Loading PDF preview...</p>,
});

interface PreviewData {
  brandName: string;
  logoUrl: string | null;
  selectedChecks: { name: string; price: number; tat: string; method: string }[];
  totalPrice: number;
}

export default function Home() {
  // Live state updated by ControlPanel
  const [selectedChecks, setSelectedChecks] = useState<{ [key: string]: boolean }>({})
  const [brandName, setBrandName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);

  // Derived live state
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const selectedCheckDetails = Object.keys(selectedChecks)
    .filter(name => selectedChecks[name])
    .map(name => {
      for (const category in idChecks) {
        const check = idChecks[category as keyof typeof idChecks].find(c => c.name === name);
        if (check) return check;
      }
      return null;
    })
    .filter(Boolean) as { name: string; price: number; tat: string; method: string }[];
  const totalPrice = selectedCheckDetails.reduce((acc, check) => acc + check.price, 0);

  // State for the preview pane
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isClient, setIsClient] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  useEffect(() => {
    setIsClient(true)
    // Set initial preview data
    setPreviewData({
      brandName,
      logoUrl,
      selectedChecks: selectedCheckDetails,
      totalPrice
    });
  }, []);

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

  const handlePreviewUpdate = () => {
    setIsPreviewLoading(true);
    // Use a short timeout to allow the UI to update and show the loader
    setTimeout(() => {
      setPreviewData({
        brandName,
        logoUrl,
        selectedChecks: selectedCheckDetails,
        totalPrice
      });
      setHasChanges(false);
      setIsPreviewLoading(false);
    }, 100); // 100ms timeout
  };

  const handleDownload = async () => {
    if (!previewData) return; // Or use live data

    const blob = await pdf((
      <AgreementPreview 
        brandName={previewData.brandName}
        logoUrl={previewData.logoUrl}
        selectedChecks={previewData.selectedChecks}
        totalPrice={previewData.totalPrice}
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
      </main>
    </div>
  )
} 