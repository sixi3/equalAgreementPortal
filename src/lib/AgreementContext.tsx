"use client";

import { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { Journey, Check, ValueAddedService } from '@/types';
import { idChecks } from '@/lib/id-checks';

const DEFAULT_SETUP_FEE = 1000000;
const DEFAULT_ANNUAL_FEE = 1200000;

const initialValueAddedServices: ValueAddedService[] = [
  { name: 'Equal Console', description: 'Equal console access shall be provided for end-end visibility on candidate e-onboarding status' },
  { name: 'Equal Gateway instances', description: "Equal will provide unique gateway instances configuring the BGV checks for each Keka's customer" },
  { name: 'Equal Reporting', description: 'Equal shall provide outreach logs for audit purpose' },
  { name: 'Business Rule Engine', description: 'Equal will provide insights on the BGV reports based on business logic provided by Merchant' },
  { name: 'Routing Engine', description: 'Equal will dynamically route request between partners for higher success rate' },
];

const initialAggregatorServices: ValueAddedService[] = [
  { name: 'Partner Network Optimisation', description: 'Equal will constantly be optimising our partner network for higher success rate for every module opted' },
  { name: 'Partner Additions', description: 'Equal will add more reliable partners for every module who has best-in-class network uptime with higher throughput' },
  { name: 'Cloud Optimisation', description: 'Equal will leverage Amazon cloud infrastructure CDN services for higher network availability' },
  { name: 'Cloud Security', description: 'Equal will leverage highest level of cyber security mesures enabling zero trust security architecture' },
];

const initialPricingNotes: string[] = [
  "A minor % of Education verification may incur an additional challan cost that's charged by the Universities at the time of verifications - this charge will be passed on at actuals",
  "AMC + Value-added Service paid yearly once (Prepay Annual) that includes Updates, Patches, Bug fixes & Customer Support",
  "All prices are exclusive of applicable taxes"
];

interface State {
  brandName: string;
  logoUrl: string | null;
  journeys: Journey[];
  priceOverrides: { [key: string]: number };
  multipliers: { [key: string]: number };
  setupFee: number;
  annualFee: number;
  isCostsModalOpen: boolean;
  editingJourney: Journey | null;
  isJourneyModalOpen: boolean;
  editingCheck: { name: string; price: number } | null;
  editingMultiplier: { name: string; label: string; defaultValue: number } | null;
  agreementTitle: string;
  agreementIntro: string;
  valueAddedServices: ValueAddedService[];
  aggregatorServices: ValueAddedService[];
  pricingNotes: string[];
  termsAndConditions: string[];
}

const initialState: State = {
  brandName: '',
  logoUrl: null,
  journeys: [],
  priceOverrides: {},
  multipliers: {},
  setupFee: DEFAULT_SETUP_FEE,
  annualFee: DEFAULT_ANNUAL_FEE,
  isCostsModalOpen: false,
  editingJourney: null,
  isJourneyModalOpen: false,
  editingCheck: null,
  editingMultiplier: null,
  agreementTitle: 'ID Verification Agreement',
  agreementIntro: `This agreement is entered into between Equal Digital and {brandName} for the provision of identity verification services as detailed below. The services will be delivered according to the specified turnaround times and through our verified partner network.`,
  valueAddedServices: initialValueAddedServices,
  aggregatorServices: initialAggregatorServices,
  pricingNotes: initialPricingNotes,
  termsAndConditions: [
    "All verification services will be provided through our certified partner network",
    "Turnaround times are indicative and may vary based on data availability",
    "Pricing is per verification check and excludes applicable taxes",
    "This agreement is valid for 30 days from the date of issue",
    "All services are subject to Equal Digital's standard terms and conditions"
  ],
};

type Action =
  | { type: 'ADD_JOURNEY'; payload: { name: string; checks: { [key: string]: boolean } } }
  | { type: 'UPDATE_JOURNEY'; payload: { id: string; name: string; checks: { [key: string]: boolean } } }
  | { type: 'DELETE_JOURNEY'; payload: string }
  | { type: 'OPEN_JOURNEY_MODAL'; payload: Journey | null }
  | { type: 'CLOSE_JOURNEY_MODAL' }
  | { type: 'SET_PRICE_OVERRIDE'; payload: { name: string; price: number } }
  | { type: 'OPEN_PRICE_MODAL'; payload: { name: string; price: number } }
  | { type: 'CLOSE_PRICE_MODAL' }
  | { type: 'SET_MULTIPLIER'; payload: { name: string; multiplier: number } }
  | { type: 'OPEN_MULTIPLIER_MODAL'; payload: { name: string; label: string; defaultValue: number } }
  | { type: 'CLOSE_MULTIPLIER_MODAL' }
  | { type: 'OPEN_COSTS_MODAL' }
  | { type: 'CLOSE_COSTS_MODAL' }
  | { type: 'UPDATE_CONTENT'; payload: Partial<Pick<State, 'agreementTitle' | 'agreementIntro' | 'valueAddedServices' | 'aggregatorServices' | 'pricingNotes' | 'termsAndConditions' | 'setupFee' | 'annualFee' | 'brandName' | 'logoUrl'>> };

function getCheckPrice(checkName: string, priceOverrides: { [key: string]: number }, multipliers: { [key: string]: number }): number {
  const basePrice = priceOverrides[checkName] !== undefined
    ? priceOverrides[checkName]
    : (() => {
        for (const category in idChecks) {
          const check = idChecks[category as keyof typeof idChecks].find(c => c.name === checkName);
          if (check) return check.price;
        }
        return 0;
      })();
  const multiplier = multipliers[checkName] || 1;
  return basePrice * multiplier;
}

const agreementReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_JOURNEY': {
      const journeyPrice = Object.keys(action.payload.checks)
        .filter(name => action.payload.checks[name])
        .reduce((acc, name) => acc + getCheckPrice(name, state.priceOverrides, state.multipliers), 0);
      const newJourney: Journey = {
        id: new Date().toISOString(),
        name: action.payload.name,
        selectedChecks: action.payload.checks,
        totalPrice: journeyPrice,
      };
      return { ...state, journeys: [...state.journeys, newJourney], isJourneyModalOpen: false, editingJourney: null };
    }
    case 'UPDATE_JOURNEY': {
      const journeyPrice = Object.keys(action.payload.checks)
        .filter(name => action.payload.checks[name])
        .reduce((acc, name) => acc + getCheckPrice(name, state.priceOverrides, state.multipliers), 0);
      return {
        ...state,
        journeys: state.journeys.map(j =>
          j.id === action.payload.id
            ? { ...j, name: action.payload.name, selectedChecks: action.payload.checks, totalPrice: journeyPrice }
            : j
        ),
        isJourneyModalOpen: false,
        editingJourney: null,
      };
    }
    case 'DELETE_JOURNEY':
      return { ...state, journeys: state.journeys.filter(j => j.id !== action.payload) };
    case 'OPEN_JOURNEY_MODAL':
      return { ...state, editingJourney: action.payload, isJourneyModalOpen: true };
    case 'CLOSE_JOURNEY_MODAL':
      return { ...state, editingJourney: null, isJourneyModalOpen: false };
    case 'SET_PRICE_OVERRIDE':
      return { ...state, priceOverrides: { ...state.priceOverrides, [action.payload.name]: action.payload.price }, editingCheck: null };
    case 'OPEN_PRICE_MODAL':
      return { ...state, editingCheck: action.payload };
    case 'CLOSE_PRICE_MODAL':
      return { ...state, editingCheck: null };
    case 'SET_MULTIPLIER':
      return { ...state, multipliers: { ...state.multipliers, [action.payload.name]: action.payload.multiplier }, editingMultiplier: null };
    case 'OPEN_MULTIPLIER_MODAL':
      return { ...state, editingMultiplier: action.payload };
    case 'CLOSE_MULTIPLIER_MODAL':
      return { ...state, editingMultiplier: null };
    case 'OPEN_COSTS_MODAL':
      return { ...state, isCostsModalOpen: true };
    case 'CLOSE_COSTS_MODAL':
      return { ...state, isCostsModalOpen: false };
    case 'UPDATE_CONTENT':
      return { ...state, ...action.payload, isCostsModalOpen: false };
    default:
      return state;
  }
};

export const AgreementContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

export const AgreementProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(agreementReducer, initialState);

  return (
    <AgreementContext.Provider value={{ state, dispatch }}>
      {children}
    </AgreementContext.Provider>
  );
}; 