"use client";

import { useState, useEffect, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AgreementContext } from '@/lib/AgreementContext';
import { ValueAddedService } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea';
import { EditableServiceTable } from './EditableServiceTable';
import Image from 'next/image';
import { useDropzone, FileRejection } from 'react-dropzone';


interface EditableContent {
    setupFee: number;
    annualFee: number;
    agreementTitle: string;
    agreementIntro: string;
    valueAddedServices: ValueAddedService[];
    aggregatorServices: ValueAddedService[];
    pricingNotes: string[];
    termsAndConditions: string[];
    brandName: string;
    logoUrl: string | null;
}

function LogoUploader({ value, onChange }: { value: string | null, onChange: (url: string | null) => void}) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (value) URL.revokeObjectURL(value)
      setError(null)

      if (fileRejections.length > 0) {
        setError(`File is too large. Max size is 1MB.`)
        onChange(null)
        return
      }

      if (acceptedFiles.length > 0) {
        const _file = acceptedFiles[0]
        const newUrl = URL.createObjectURL(_file);
        onChange(newUrl);
      }
    },
    [onChange, value]
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    maxSize: 1024 * 1024, // 1MB
    noClick: !!value,
    noKeyboard: !!value,
  })

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (value) URL.revokeObjectURL(value)
    setError(null)
    onChange(null)
  }
  
  const baseClasses = "h-[64px] rounded-lg p-2 transition-colors flex items-center";
  const previewClasses = "justify-between border bg-slate-50";
  const dropzoneClasses = `justify-center border-2 border-dashed bg-slate-100/50 backdrop-blur-md text-center cursor-pointer ${
    isDragActive ? 'border-primary' : error ? 'border-destructive' : 'border-border'
  }`;

  return (
    <div {...getRootProps()} className={`${baseClasses} ${value ? previewClasses : dropzoneClasses}`}>
      <input {...getInputProps()} />
      {value ? (
        <>
          <div className="flex items-center gap-3">
            <Image src={value} alt="Logo Preview" width={96} height={24} className="h-6 w-auto object-contain" />
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

export function AdditionalCostsModal() {
  const { state, dispatch } = useContext(AgreementContext);
  const { 
    isCostsModalOpen, 
    ...editableContentFields 
  } = state;

  const [editableContent, setEditableContent] = useState<EditableContent>(editableContentFields);
  const [activeTab, setActiveTab] = useState('texts');

  useEffect(() => {
    if (isCostsModalOpen) {
      setEditableContent({
        setupFee: state.setupFee,
        annualFee: state.annualFee,
        agreementTitle: state.agreementTitle,
        agreementIntro: state.agreementIntro,
        valueAddedServices: state.valueAddedServices,
        aggregatorServices: state.aggregatorServices,
        pricingNotes: state.pricingNotes,
        termsAndConditions: state.termsAndConditions,
        brandName: state.brandName,
        logoUrl: state.logoUrl,
      });
    }
  }, [isCostsModalOpen, state]);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_CONTENT', payload: editableContent });
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_COSTS_MODAL' });
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditableContent(prev => ({ ...prev, [id]: value }));
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditableContent(prev => ({ ...prev, [id]: value.split('\n') }));
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN').format(value);
  }

  const parseNumber = (value: string) => {
    return parseInt(value.replace(/,/g, ''), 10) || 0;
  }

  if (!isCostsModalOpen) return null;

  return (
    <Dialog open={isCostsModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Agreement Content</DialogTitle>
          <DialogDescription>
            Update fees, text, tables, and other content for the agreement
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="py-4">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="texts">Branding & Text</TabsTrigger>
                <TabsTrigger value="fees">Fees & Notes</TabsTrigger>
                <TabsTrigger value="tables">Service Tables</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="pt-4"
              >
                {activeTab === 'texts' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="brandName">Brand Name</Label>
                        <Input id="brandName" value={editableContent.brandName} onChange={handleTextChange} />
                    </div>
                    <div className="space-y-2">
                        <Label>Brand Logo</Label>
                        <LogoUploader 
                          value={editableContent.logoUrl} 
                          onChange={(url) => setEditableContent(prev => ({...prev, logoUrl: url}))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="agreementTitle">Agreement Title</Label>
                        <Input id="agreementTitle" value={editableContent.agreementTitle} onChange={handleTextChange} />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Agreement Introduction</Label>
                        <div className="p-3 rounded-md border bg-muted/50 text-sm min-h-[98px]">
                            {editableContent.agreementIntro.replace('{brandName}', editableContent.brandName || '[Client Name]')}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="termsAndConditions">Terms & Conditions</Label>
                        <Textarea id="termsAndConditions" value={editableContent.termsAndConditions.join('\n')} onChange={handleNotesChange} rows={8} />
                        <p className="text-xs text-muted-foreground">
                            Each line will be treated as a separate bullet point.
                        </p>
                    </div>
                  </div>
                )}
                {activeTab === 'fees' && (
                   <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="setupFee">Set-up Fee + Integration cost (One time Fee)</Label>
                            <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">INR</span>
                            <Input
                                id="setupFee"
                                type="text"
                                value={formatNumber(editableContent.setupFee)}
                                onChange={e => setEditableContent(prev => ({...prev, setupFee: parseNumber(e.target.value)}))}
                                className="pl-12"
                            />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="annualFee">Value-added Services (Prepay Annual)</Label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">INR</span>
                                <Input
                                    id="annualFee"
                                    type="text"
                                    value={formatNumber(editableContent.annualFee)}
                                    onChange={e => setEditableContent(prev => ({...prev, annualFee: parseNumber(e.target.value)}))}
                                    className="pl-12"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pricingNotes">Pricing Notes</Label>
                        <Textarea id="pricingNotes" value={editableContent.pricingNotes.join('\n')} onChange={handleNotesChange} rows={5} />
                         <p className="text-xs text-muted-foreground">
                            Each line will be treated as a separate bullet point.
                        </p>
                    </div>
                  </div>
                )}
                {activeTab === 'tables' && (
                  <div className="space-y-2">
                    <p className="text-sm font-regular text-slate-700">Choose table:</p>
                      <Tabs defaultValue="value-added">
                          <TabsList className="inline-flex h-auto rounded-full bg-white p-0">
                              <TabsTrigger value="value-added" className="rounded-full px-4 py-1 data-[state=active]:border border-slate-200 data-[state=active]:shadow-sm h-8">Value-added Services</TabsTrigger>
                              <TabsTrigger value="aggregator" className="rounded-full px-4 py-1 data-[state=active]:border border-slate-200 data-[state=active]:shadow-sm h-8">Aggregator Services</TabsTrigger>
                          </TabsList>
                          <TabsContent value="value-added" className="mt-4">
                              <EditableServiceTable 
                                  title="Value-added Services"
                                  data={editableContent.valueAddedServices}
                                  onChange={(newData) => setEditableContent(prev => ({ ...prev, valueAddedServices: newData }))}
                              />
                          </TabsContent>
                          <TabsContent value="aggregator" className="mt-4">
                              <EditableServiceTable 
                                  title="Aggregator Services"
                                  data={editableContent.aggregatorServices}
                                  onChange={(newData) => setEditableContent(prev => ({ ...prev, aggregatorServices: newData }))}
                              />
                          </TabsContent>
                      </Tabs>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
        </Tabs>
        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Discard
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 