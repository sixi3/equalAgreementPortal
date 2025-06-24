"use client";

import { useState, useEffect } from 'react';
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

interface AdditionalCostsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (costs: { setupFee: number; annualFee: number }) => void;
  defaultSetupFee: number;
  defaultAnnualFee: number;
}

export function AdditionalCostsModal({
  isOpen,
  onClose,
  onSave,
  defaultSetupFee,
  defaultAnnualFee
}: AdditionalCostsModalProps) {
  const [setupFee, setSetupFee] = useState(defaultSetupFee);
  const [annualFee, setAnnualFee] = useState(defaultAnnualFee);

  useEffect(() => {
    if (isOpen) {
      setSetupFee(defaultSetupFee);
      setAnnualFee(defaultAnnualFee);
    }
  }, [isOpen, defaultSetupFee, defaultAnnualFee]);

  const handleSave = () => {
    onSave({ setupFee, annualFee });
    onClose();
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN').format(value);
  }

  const parseNumber = (value: string) => {
    return parseInt(value.replace(/,/g, ''), 10) || 0;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Additional Costs</DialogTitle>
          <DialogDescription>
            Set the one-time and annual fees for the agreement.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="setup-fee">Set-up Fee + Integration cost (One time Fee)</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">INR</span>
              <Input
                id="setup-fee"
                type="text"
                value={formatNumber(setupFee)}
                onChange={e => setSetupFee(parseNumber(e.target.value))}
                className="pl-12"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="annual-fee">Value-added Service paid yearly once (Prepay Annual)</Label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">INR</span>
                <Input
                    id="annual-fee"
                    type="text"
                    value={formatNumber(annualFee)}
                    onChange={e => setAnnualFee(parseNumber(e.target.value))}
                    className="pl-12"
                />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Discard
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 