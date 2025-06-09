import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface IDCardProps {
  name: string
  price: string
  tat: string
  partnerNetwork: string
  method: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function IDCard({ name, price, tat, partnerNetwork, method, checked: _checked, onChange }: IDCardProps) {
  return (
    <Card className={`w-full transition-shadow hover:shadow-lg cursor-pointer ${'border-primary'}`} onClick={() => onChange(!_checked)}>
      <div className="p-3">
        <div className="flex flex-row items-center justify-between gap-3 pb-6">
          <div className="flex items-center gap-2">
            <Checkbox id={name} checked={_checked} />
            <Label htmlFor={name} className="text-sm font-semibold cursor-pointer">
              {name}
            </Label>
          </div>
          <span className="text-primary font-bold text-sm">{price}</span>
        </div>
        <div className="text-xs text-muted-foreground flex justify-between">
          <div className="flex flex-col items-start">
              <span className="text-muted-foreground">Method</span>
              <span className="font-semibold text-foreground">{method}</span>
          </div>
          <div className="flex flex-col items-start">
              <span className="text-muted-foreground">TAT</span>
              <span className="font-semibold text-foreground">{tat}</span>
          </div>
          <div className="flex flex-col items-start">
              <span className="text-muted-foreground">Partner Network</span>
              <span className="font-semibold text-foreground">{partnerNetwork}</span>
          </div>
        </div>
      </div>
    </Card>
  )
} 