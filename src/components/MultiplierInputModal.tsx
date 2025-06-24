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

interface MultiplierInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (multiplier: number) => void;
  checkName: string;
  defaultValue?: number;
  label: string;
}

export function MultiplierInputModal({ isOpen, onClose, onSave, checkName, defaultValue = 1, label }: MultiplierInputModalProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) setValue(defaultValue);
  }, [isOpen, defaultValue]);

  const handleSave = () => {
    onSave(Math.max(1, value));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Quantity</DialogTitle>
          <DialogDescription>
            Please enter the number of {label.toLowerCase()}s you would like to verify.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="multiplier">Number of {label}</Label>
          <Input
            id="multiplier"
            type="number"
            min={1}
            value={value}
            onChange={e => setValue(Math.max(1, parseInt(e.target.value) || 1))}
          />
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