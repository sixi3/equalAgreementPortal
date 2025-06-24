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
import { Badge } from "@/components/ui/badge";
import { idChecks, Check } from "@/lib/id-checks";
import { IDCard } from "@/components/IDCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X } from 'lucide-react';
import { Journey } from '@/types';

interface JourneyBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveJourney: (journeyName: string, selectedChecks: { [key: string]: boolean }) => void;
  onUpdateJourney: (id: string, name: string, checks: { [key: string]: boolean }) => void;
  journeyToEdit: Journey | null;
  journeys: Journey[];
  priceOverrides: { [key: string]: number };
  onEditPrice: (checkName: string, currentPrice: number) => void;
  onSpecialCheckSelect: (checkName: string) => void;
  multipliers: { [key: string]: number };
}

const SPECIAL_CHECKS = [
  'Highest Education*',
  'Employment & Conduct (Per check) - Last 7 years',
];

export function JourneyBuilderModal({ isOpen, onClose, onSaveJourney, onUpdateJourney, journeyToEdit, journeys, priceOverrides, onEditPrice, onSpecialCheckSelect, multipliers }: JourneyBuilderModalProps) {
  const [journeyName, setJourneyName] = useState("");
  const [selectedChecks, setSelectedChecks] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    if (journeyToEdit) {
      setJourneyName(journeyToEdit.name);
      setSelectedChecks(journeyToEdit.selectedChecks);
    } else {
      setJourneyName("");
      setSelectedChecks({});
    }
  }, [journeyToEdit, isOpen]);

  const handleCheckChange = (name: string, checked: boolean) => {
    if (checked && SPECIAL_CHECKS.includes(name) && !selectedChecks[name]) {
      onSpecialCheckSelect(name);
    }
    setSelectedChecks((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectAll = (_category: string, checks: Check[]) => {
    const categoryCheckNames = checks.map(c => c.name);
    const allSelected = categoryCheckNames.every(name => selectedChecks[name]);
    
    const newSelected = { ...selectedChecks };
    categoryCheckNames.forEach(_name => {
      newSelected[_name] = !allSelected;
    });
    setSelectedChecks(newSelected);
  }

  const handleSave = () => {
    if (journeyToEdit) {
      onUpdateJourney(journeyToEdit.id, journeyName, selectedChecks);
    } else {
      onSaveJourney(journeyName, selectedChecks);
    }
    onClose();
  };

  // Build a map of unavailable checks: { [checkName]: journeyName }
  const unavailableChecks: { [checkName: string]: string } = {};
  journeys.forEach(j => {
    if (!journeyToEdit || j.id !== journeyToEdit.id) {
      Object.entries(j.selectedChecks).forEach(([check, val]) => {
        if (val) unavailableChecks[check] = j.name;
      });
    }
  });

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{journeyToEdit ? 'Edit Journey' : 'Create a New Journey'}</DialogTitle>
          <DialogDescription>
            {journeyToEdit ? 'Update the journey name or change the selected checks.' : 'Name your journey and select the verification checks you need.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-shrink-0">
            <Input 
                placeholder="Name your journey (e.g., Pre-Offer, High-Risk)" 
                value={journeyName} 
                onChange={(e) => setJourneyName(e.target.value)} 
            />
            {/* Sticky Header */}
            <div className="flex-shrink-0 space-y-4 pb-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-[14px] font-medium text-slate-500">CHOOSE YOUR VERIFICATIONS</h3>
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
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-6 p-3 -mx-6">
          {Object.entries(filteredChecks).map(([category, checks]) => (
            <div key={category} className="space-y-3 px-6">
              <div className="flex justify-between items-center">
                <Badge variant="secondary">{category}</Badge>
                <Button variant="link" size="sm" onClick={() => handleSelectAll(category, checks)}>Select All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {checks.map((check) => {
                  const isUnavailable = unavailableChecks[check.name] !== undefined;
                  const currentPrice = priceOverrides[check.name] ?? check.price;
                  const multiplier = multipliers[check.name] || 1;
                  const displayPrice = currentPrice * multiplier;

                  return (
                    <IDCard
                      key={check.name}
                      name={check.name}
                      price={displayPrice}
                      tat={check.tat}
                      partnerNetwork={check.partnerNetwork}
                      method={check.method}
                      checked={!!selectedChecks[check.name]}
                      onChange={(checked) => handleCheckChange(check.name, !!checked)}
                      onEditPrice={() => onEditPrice(check.name, currentPrice)}
                      insights={check.insights}
                      disabled={isUnavailable}
                      unavailableMessage={isUnavailable ? `Already part of ${unavailableChecks[check.name]}` : undefined}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Discard
          </Button>
          <Button onClick={handleSave} disabled={!journeyName || Object.keys(selectedChecks).filter(c => selectedChecks[c]).length === 0}>
            {journeyToEdit ? 'Save Changes' : 'Save Journey'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 