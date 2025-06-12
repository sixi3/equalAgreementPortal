export interface Check {
  name: string
  price: number
  tat: string
  partnerNetwork: string
  method: string
}

export interface SelectedChecks {
  [key: string]: boolean
} 