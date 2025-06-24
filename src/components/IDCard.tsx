import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Button } from './ui/button'
import { Pencil } from 'lucide-react'

interface IDCardProps {
  name: string
  price: number
  tat: string
  partnerNetwork: string
  method: string
  checked: boolean
  onChange: (checked: boolean) => void
  onEditPrice: () => void
  insights?: string
  disabled?: boolean
  unavailableMessage?: string
}

export function IDCard({ name, price, tat, partnerNetwork, method, checked: _checked, onChange, onEditPrice, insights, disabled = false, unavailableMessage }: IDCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card
      className={`w-full transition-shadow cursor-pointer 
        ${_checked ? 'border border-slate-200 shadow-lg hover:border-slate-300 hover:shadow-lg' : 'border border-slate-200 hover:border-slate-300 shadow-none hover:shadow-md'}
        ${disabled ? 'opacity-50 pointer-events-none select-none bg-slate-100' : ''}
      `}
      onClick={() => !disabled && onChange(!_checked)}
    >
      <div className="p-2">
        <div className="flex flex-row items-center justify-between gap-3 pb-6">
          <div className="flex items-center gap-2">
            <Checkbox id={name} checked={_checked} disabled={disabled} />
            <Label htmlFor={name} className="text-sm font-medium cursor-pointer">
              {name}
            </Label>
          </div>
          <div className="relative group w-28 flex justify-end text-primary font-semibold text-sm tracking-wide">
            <span className={`transition-opacity ${!disabled ? 'group-hover:invisible' : ''}`}>INR ₹{price}</span>
            {!disabled && (
              <button
                type="button"
                className="absolute left-0 top-0 h-full w-full flex items-center justify-end pr-2 text-primary underline opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={e => { e.stopPropagation(); onEditPrice(); }}
                tabIndex={-1}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        {disabled && unavailableMessage && (
          <div className="text-xs text-slate-500 mb-2 ml-1">{unavailableMessage}</div>
        )}
        <div className="text-xs text-muted-foreground flex justify-between">
          <div className="flex flex-col items-start">
              <span className="text-muted-foreground text-[10px]">Method</span>
              <span className="font-medium text-slate-700">{method}</span>
          </div>
          <div className="flex flex-col items-start">
              <span className="text-muted-foreground text-[10px]">TAT</span>
              <span className="font-medium text-slate-700">{tat}</span>
          </div>
          <div className="flex flex-col items-start">
              <span className="text-muted-foreground text-[10px]">Partner Network</span>
              <span className="font-medium text-slate-700">{partnerNetwork}</span>
          </div>
        </div>
      </div>
      {insights && (
        <div className="mt-[-4px] p-2 bg-green-50 border-t border-green-200 text-xs text-green-800 rounded-b-xl">
          <span className="font-semibold">Insight:</span> {insights}
        </div>
      )}
    </Card>
  )
} 