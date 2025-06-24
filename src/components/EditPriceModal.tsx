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

export function EditPriceModal() {
  const { state, dispatch } = useContext(AgreementContext);
  const { editingCheck } = state;
  const isOpen = !!editingCheck;
  const checkName = editingCheck?.name || '';
  const originalPrice = editingCheck?.price || 0;

  const [price, setPrice] = useState(originalPrice);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setPrice(originalPrice);
      setDiscount(0);
    }
  }, [isOpen, originalPrice]);

  useEffect(() => {
    if (originalPrice > 0) {
      const newDiscount = ((originalPrice - price) / originalPrice) * 100;
      setDiscount(Math.round(newDiscount * 100) / 100); // Round to 2 decimal places
    }
  }, [price, originalPrice]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    setPrice(isNaN(newPrice) ? 0 : newPrice);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newDiscount = parseFloat(e.target.value);
    if (isNaN(newDiscount)) {
      newDiscount = 0;
    }
    const newPrice = originalPrice * (1 - newDiscount / 100);
    setPrice(Math.round(newPrice * 100) / 100); // Round to 2 decimal places
  };

  const handleSave = () => {
    if (editingCheck) {
      dispatch({ type: 'SET_PRICE_OVERRIDE', payload: { name: editingCheck.name, price } });
    }
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_PRICE_MODAL' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Price for {checkName}</DialogTitle>
          <DialogDescription>
            Adjust the price by setting a new value or applying a discount.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input id="discount" type="number" value={discount} onChange={handleDiscountChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">New Price (INR)</Label>
            <Input id="price" type="number" value={price} onChange={handlePriceChange} />
          </div>
        </div>
        
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-md border">
          <span className="text-sm text-slate-600">Final Price:</span>
          <span className="text-lg font-bold text-slate-800">₹{price.toLocaleString('en-IN')}</span>
        </div>

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