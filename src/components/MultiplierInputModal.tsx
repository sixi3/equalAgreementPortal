"use client";

import { useState, useEffect, useContext } from 'react';
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

export function MultiplierInputModal() {
  const { state, dispatch } = useContext(AgreementContext);
  const { editingMultiplier } = state;
  const isOpen = !!editingMultiplier;
  const checkName = editingMultiplier?.name || '';
  const defaultValue = editingMultiplier?.defaultValue || 1;
  const label = editingMultiplier?.label || '';

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) setValue(defaultValue);
  }, [isOpen, defaultValue]);

  const handleSave = () => {
    if (editingMultiplier) {
      dispatch({ type: 'SET_MULTIPLIER', payload: { name: editingMultiplier.name, multiplier: Math.max(1, value) } });
    }
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_MULTIPLIER_MODAL' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
          <Button variant="ghost" onClick={handleClose}>
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