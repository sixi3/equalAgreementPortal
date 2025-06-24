"use client"

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Loader2, Plus } from 'lucide-react'
import { Journey } from '@/types'
import { JourneyCard } from './JourneyCard'
import { useDropzone, FileRejection } from 'react-dropzone'
import { useState, useCallback, useRef, useEffect } from 'react'

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
  journeys: Journey[];
  onDeleteJourney: (id: string) => void;
  onOpenModal: (journey: Journey | null) => void;
  totalPrice: number;
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
  journeys,
  onDeleteJourney,
  onOpenModal,
  totalPrice,
  onDownload,
  onPreview,
  hasChanges,
  isPreviewLoading,
}: ControlPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showBlur, setShowBlur] = useState(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowBlur(el.scrollTop + el.clientHeight < el.scrollHeight - 2 && el.scrollHeight > el.clientHeight + 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowBlur(el.scrollTop + el.clientHeight < el.scrollHeight - 2 && el.scrollHeight > el.clientHeight + 2);
  }, [journeys]);

  return (
    <Card className="h-[100vh] bg-white">
      <CardContent className="flex flex-col h-full p-4">
        {/* Branding Section - Fixed Height */}
        <div className="space-y-2 flex-shrink-0">
          <h3 className="text-[14px] font-medium tracking-widest text-slate-500">CUSTOMISE YOUR AGREEMENT</h3>
          <div className="space-y-2">
            <Label htmlFor="brandName">Brand Name</Label>
            <Input id="brandName" placeholder="Enter your brand name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Brand Logo</Label>
            <LogoUploader onLogoChange={setLogo} />
          </div>
        </div>

        {/* Journeys Section - Flexible Height */}
        <div className="flex flex-col flex-1 min-h-0 mt-4">
          <h3 className="text-[14px] font-medium tracking-widest text-slate-500 mb-2">JOURNEYS</h3>
          {journeys.length === 0 ? (
            <button
              onClick={() => onOpenModal(null)}
              className="flex flex-col items-center justify-center w-full h-full bg-linear-to-br from-slate-100 to-slate-400 p-6 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-500/5 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-slate-600 rounded-full">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <span className="mt-2 text-md font-medium tracking-wide text-slate-500">Create New Journey</span>
            </button>
          ) : (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="relative flex-1 min-h-0">
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="overflow-y-auto scrollbar-hide h-full"
                  style={{ flex: '1 1 0%', minHeight: 0 }}
                >
                  {journeys.map(journey => (
                    <JourneyCard
                      key={journey.id}
                      journey={journey}
                      onEdit={() => onOpenModal(journey)}
                      onDelete={onDeleteJourney}
                    />
                  ))}
                </div>
                {/* Blur overlay at bottom to indicate scroll */}
                {showBlur && (
                  <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-slate-100 via-slate-100/80 to-transparent" />
                )}
              </div>
              <div style={{ minHeight: 40, maxHeight: 120 }} className="flex items-end py-4 border-t border-slate-200">
                <button
                  onClick={() => onOpenModal(null)}
                  className="flex flex-col items-center justify-center w-full h-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-500/5 transition-colors"
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-slate-600 rounded-full">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span className="mt-1 text-md font-medium tracking-wide text-slate-500">Create New Journey</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Total Price Section - Fixed Height */}
        <div className="border-t flex-shrink-0 pt-2 mt-2">
          <div className="space-y-2">
            <h3 className="text-[14px] font-medium text-slate-500">COST BREAKDOWN</h3>
            <div className="max-h-24 overflow-y-auto space-y-1">
              {journeys.length > 0 ? (
                journeys.map(j => (
                  <div key={j.id} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{j.name}</span>
                    <span className="font-medium text-slate-800">₹{j.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">
                  No journeys created yet.
                </p>
              )}
            </div>
          </div>
          <div>
            <Separator className="my-3"/>
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