export interface Check {
  name: string
  price: number
  tat: string
  partnerNetwork: string
  method: string
  insights?: string
}

export interface SelectedChecks {
  [key: string]: boolean
}

export interface Journey {
  id: string
  name: string
  selectedChecks: { [key: string]: boolean }
  totalPrice: number
}

export interface ValueAddedService {
  name: string;
  description: string;
} 