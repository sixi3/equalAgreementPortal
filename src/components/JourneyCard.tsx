"use client";

import { Journey } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

interface JourneyCardProps {
  journey: Journey;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function JourneyCard({ journey, onEdit, onDelete }: JourneyCardProps) {
  const checkCount = Object.keys(journey.selectedChecks).length;

  return (
    <div className="bg-white/60 p-4 rounded-lg border border-slate-200 shadow-sm mb-2">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="font-semibold text-slate-800">{journey.name}</h4>
          <p className="text-sm text-slate-500 mb-2">
            {checkCount} check{checkCount !== 1 ? 's' : ''} selected
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.entries(journey.selectedChecks)
              .filter(([_, v]) => v)
              .map(([name]) => (
                <Badge key={name} variant="secondary" className="text-xs font-normal">{name}</Badge>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(journey.id)}>
            <Edit className="h-4 w-4 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDelete(journey.id)}>
            <Trash2 className="h-4 w-4 text-destructive/80" />
          </Button>
        </div>
      </div>
      <div className="mt-3 border-t border-slate-200 pt-3">
        <p className="text-lg font-bold text-right text-slate-700">
          ₹{journey.totalPrice.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
} 