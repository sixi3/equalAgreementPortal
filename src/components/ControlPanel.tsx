"use client"

import { useState, useCallback, useEffect } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IDCard } from '@/components/IDCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { idChecks } from '@/lib/id-checks'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, X } from 'lucide-react'
import { Check } from '@/lib/id-checks'
import { cn } from '@/lib/utils'

const PRE_OFFER_CHECKS = ['Aadhaar', 'PAN Basic', 'Criminal Court (CCRV)'].sort();
const POST_OFFER_CHECKS = [
  'Aadhaar',
  'PAN Advanced (Aadhaar <> PAN Linkage)',
  'Bank Account Validation',
  'Criminal Court (CCRV)',
  'Highest Education*',
  'Employment & Conduct (Per check) - Last 7 years',
].sort();

function LogoUploader({ onLogoChange }: { onLogoChange: (file: File | null) => void }) {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Clean up previous state
      if (preview) URL.revokeObjectURL(preview)
      setError(null)

      if (fileRejections.length > 0) {
        setError(`File is too large. Max size is 1MB.`)
        setPreview(null)
        onLogoChange(null)
        return
      }

      if (acceptedFiles.length > 0) {
        const _file = acceptedFiles[0]
        setPreview(URL.createObjectURL(_file))
        onLogoChange(_file)
      }
    },
    [onLogoChange, preview]
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    maxSize: 1024 * 1024, // 1MB
    noClick: !!preview,
    noKeyboard: !!preview,
  })

  const handleDelete = (e: React.MouseEvent) => {
    // Stop propagation to prevent the dropzone from opening after deletion.
    e.stopPropagation()
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setError(null)
    onLogoChange(null)
  }
  
  const baseClasses = "h-[64px] rounded-lg p-2 transition-colors flex items-center";
  const previewClasses = "justify-between border bg-slate-50";
  const dropzoneClasses = `justify-center border-2 border-dashed bg-slate-100/50 backdrop-blur-md text-center cursor-pointer ${
    isDragActive ? 'border-primary' : error ? 'border-destructive' : 'border-border'
  }`;

  return (
    <div {...getRootProps()} className={`${baseClasses} ${preview ? previewClasses : dropzoneClasses}`}>
      <input {...getInputProps()} />
      {preview ? (
        <>
          <div className="flex items-center gap-3">
            <Image src={preview} alt="Logo Preview" width={96} height={24} className="h-6 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={open}>
              Replace
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Delete
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Drag/Drop or click to upload</p>
          {error ? (
            <p className="text-[10px] text-destructive">{error}</p>
          ) : (
            <p className="text-[10px] text-muted-foreground">Max file size: 1MB</p>
          )}
        </div>
      )}
    </div>
  )
}

interface ControlPanelProps {
  brandName: string;
  setBrandName: (name: string) => void;
  logo: File | null;
  setLogo: (file: File | null) => void;
  selectedChecks: { [key: string]: boolean };
  setSelectedChecks: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  totalPrice: number;
  selectedCheckNames: string[];
  onDownload: () => void;
  onPreview: () => void;
  hasChanges: boolean;
  isPreviewLoading: boolean;
}

export default function ControlPanel({
  brandName,
  setBrandName,
  logo,
  setLogo,
  selectedChecks,
  setSelectedChecks,
  totalPrice,
  selectedCheckNames,
  onDownload,
  onPreview,
  hasChanges,
  isPreviewLoading,
}: ControlPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [activePreset, setActivePreset] = useState<string | null>(null);

  useEffect(() => {
    const currentSelection = Object.keys(selectedChecks).filter(k => selectedChecks[k]).sort();
    
    let matchesPreset: string | null = null;
    
    if (JSON.stringify(currentSelection) === JSON.stringify(PRE_OFFER_CHECKS)) {
        matchesPreset = 'pre-offer';
    } else if (JSON.stringify(currentSelection) === JSON.stringify(POST_OFFER_CHECKS)) {
        matchesPreset = 'post-offer';
    }
    
    if (matchesPreset !== activePreset) {
      setActivePreset(matchesPreset);
    }
  }, [selectedChecks, activePreset]);

  const handleCheckChange = (name: string, checked: boolean) => {
    setSelectedChecks((prev) => ({ ...prev, [name]: checked }))
  }
  
  const handleSelectAll = (_category: string, checks: Check[]) => {
    const categoryCheckNames = checks.map(c => c.name);
    const allSelected = categoryCheckNames.every(name => selectedChecks[name]);
    
    const newSelected = { ...selectedChecks };
    categoryCheckNames.forEach(_name => {
      newSelected[_name] = !allSelected;
    });
    setSelectedChecks(newSelected);
  }

  const handleClearAll = () => {
    setSelectedChecks({});
  }

  const handlePresetChange = (value: string) => {
    // If the clicked preset is already active, clear the selection.
    if (activePreset === value) {
      setSelectedChecks({});
    } else {
      // Otherwise, set the new preset's checks.
      let checksToSelect: string[] = [];
      if (value === 'pre-offer') {
        checksToSelect = PRE_OFFER_CHECKS;
      } else if (value === 'post-offer') {
        checksToSelect = POST_OFFER_CHECKS;
      }

      const newSelected: { [key: string]: boolean } = {};
      checksToSelect.forEach(name => {
        newSelected[name] = true;
      });
      setSelectedChecks(newSelected);
    }
  };

  const filteredChecks = Object.entries(idChecks)
    .filter(([category, _]) => categoryFilter === 'All' || category === categoryFilter)
    .reduce((acc, [category, checks]) => {
      const filtered = checks.filter(check => check.name.toLowerCase().includes(searchTerm.toLowerCase()));
      if (filtered.length > 0) {
        acc[category as keyof typeof idChecks] = filtered;
      }
      return acc;
    }, {} as typeof idChecks);

  return (
    <Card className="h-[100vh] bg-white/50 backdrop-blur-md">
      <CardContent className="flex flex-col h-full p-4">
        {/* Branding Section - Fixed Height */}
        <div className="space-y-2 flex-shrink-0">
          <h3 className="text-[14px] font-medium text-slate-500">CUSTOMISE YOUR AGREEMENT</h3>
          <div className="space-y-2">
            <Label htmlFor="brandName">Brand Name</Label>
            <Input id="brandName" placeholder="Enter your brand name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Brand Logo</Label>
            <LogoUploader onLogoChange={setLogo} />
          </div>
        </div>
        
        <Separator className="mt-4 mb-2" />

        {/* Verification Checks Section - Flexible Height */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Sticky Header */}
          <div className="flex-shrink-0 space-y-4 pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[14px] font-medium text-slate-500">CHOOSE YOUR VERIFICATIONS</h3>
              <Button 
                variant="link" 
                size="sm" 
                onClick={handleClearAll} 
                className={`text-slate-600 hover:text-slate-800 ${selectedCheckNames.length === 0 ? 'invisible' : ''}`}
              >
                Clear All
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Input 
                  placeholder="Search for a check" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pr-8"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-slate-700">IN</p>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Checks</SelectItem>
                  {Object.keys(idChecks).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-2">
              <h3 className="text-[12px] font-medium text-slate-500 mb-2">BUNDLES:</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetChange('pre-offer')}
                  className={cn(
                    "rounded-full",
                    activePreset === 'pre-offer' && "border-green-800 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-700"
                  )}
                >
                  Pre-Offer Checks
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetChange('post-offer')}
                  className={cn(
                    "rounded-full",
                    activePreset === 'post-offer' && "border-green-800 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-700"
                  )}
                >
                  Post-Offer Checks
                </Button>
              </div>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto space-y-6 p-3">
            {Object.entries(filteredChecks).map(([category, checks]) => (
              <div key={category} className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{category}</Badge>
                  <Button variant="link" size="sm" onClick={() => handleSelectAll(category, checks)}>Select All</Button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {checks.map((check) => (
                    <IDCard
                      key={check.name}
                      name={check.name}
                      price={`INR ₹${check.price}`}
                      tat={check.tat}
                      partnerNetwork={check.partnerNetwork}
                      method={check.method}
                      checked={!!selectedChecks[check.name]}
                      onChange={(checked) => handleCheckChange(check.name, !!checked)}
                      insights={check.insights}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price Section - Fixed Height */}
        <div className="border-t flex-shrink-0">
          <div className="space-y-4">
            <div>
              <div className="overflow-y-auto rounded-lg pt-2 flex flex-wrap gap-1 items-center bg-transparent">
                {selectedCheckNames.length > 0 ? (
                  selectedCheckNames.map(name => (
                    <Badge key={name} variant="secondary" className="font-normal">{name}</Badge>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Selected checks will appear here.
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
                <span className="text-sm text-muted-foreground ml-1">total</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={onPreview} 
                  disabled={!hasChanges || isPreviewLoading}
                  className="relative"
                >
                  {isPreviewLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Preview
                </Button>
                <Button onClick={onDownload} disabled={isPreviewLoading}>Download Agreement</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 