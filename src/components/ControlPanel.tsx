"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { JourneyCard } from './JourneyCard'
import { useRef, useState, useEffect, useContext } from 'react'
import { AgreementContext } from '@/lib/AgreementContext'

interface ControlPanelProps {
  totalPrice: number;
  onDownload: () => void;
}

export default function ControlPanel({
  totalPrice,
  onDownload,
}: ControlPanelProps) {
  const { state, dispatch } = useContext(AgreementContext);
  const { journeys } = state;
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
        {/* Journeys Section - Flexible Height */}
        <div className="flex flex-col flex-1 min-h-0">
          <h3 className="text-[14px] font-medium tracking-widest text-slate-500 mb-2">JOURNEYS</h3>
          {journeys.length === 0 ? (
            <button
              onClick={() => dispatch({ type: 'OPEN_JOURNEY_MODAL', payload: null })}
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
                  className="overflow-y-auto scrollbar-hide h-full pr-2"
                >
                  {journeys.map(journey => (
                    <JourneyCard
                      key={journey.id}
                      journey={journey}
                      onEdit={() => dispatch({ type: 'OPEN_JOURNEY_MODAL', payload: journey })}
                      onDelete={() => dispatch({ type: 'DELETE_JOURNEY', payload: journey.id })}
                    />
                  ))}
                </div>
                {/* Blur overlay at bottom to indicate scroll */}
                {showBlur && (
                  <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-slate-100 via-slate-100/80 to-transparent" />
                )}
              </div>
              <div className="flex-shrink-0 pt-4 mt-2 border-t">
                <button
                  onClick={() => dispatch({ type: 'OPEN_JOURNEY_MODAL', payload: null })}
                  className="flex items-center justify-center w-full h-16 p-2 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-500/5 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2 text-slate-600" />
                  <span className="text-sm font-medium text-slate-600">Create New Journey</span>
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
                <Button onClick={onDownload}>Download Agreement</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 