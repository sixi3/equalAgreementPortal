export interface Check {
  name: string;
  price: number;
  tat: string;
  partnerNetwork: string;
  method: string;
  description?: string;
}

export const idChecks: Record<string, Check[]> = {
  "Identity Checks": [
    { name: 'Aadhaar', price: 30, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Digi-locker / OCR' },
    { name: 'PAN Basic', price: 30, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Digital Fetch' },
    { name: 'PAN Advanced (Aadhaar <> PAN Linkage)', price: 45, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Digital Fetch' },
    { name: 'Bank Account Validation', price: 30, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Digital Fetch' },
    { name: 'Voter ID', price: 30, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Digital Fetch' },
    { name: 'Driving License', price: 30, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Digital Fetch' },
    { name: 'Vehicle RC', price: 30, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Digital Fetch' },
    { name: 'ESIC', price: 30, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Digital Fetch' },
  ],
  "Social Media Checks": [
    { name: 'Social Media', price: 150, tat: 'Instant', partnerNetwork: '3 Data Partners', method: 'Digital Fetch' },
  ],
  "Criminal Checks": [
    { name: 'Criminal Court (CCRV)', price: 200, tat: 'T + 48 hours', partnerNetwork: '2 Data Partners', method: 'Digital Fetch' },
    { name: 'Police verification through Law firm', price: 500, tat: 'T + 14 days', partnerNetwork: '2 Data Partners', method: 'Physical verification' },
    { name: 'Global database check', price: 250, tat: 'Instant', partnerNetwork: '2 Partners', method: 'Digital Fetch' },
  ],
  "Salary Validation": [
    { name: 'Payslip (Tampering + POO + MCA)', price: 150, tat: '4 Hours', partnerNetwork: '3 Data Partners', method: 'User Upload' },
    { name: 'Bank Statement (Match against Payslip)', price: 150, tat: '4 Hours', partnerNetwork: '3 Data Partners', method: 'User Upload' },
  ],
  "Credit Checks": [
    { name: 'Credit check (CIBIL / CRIF / Experian / Equifax)', price: 200, tat: 'Instant', partnerNetwork: '4 Data Partners', method: 'Digital Fetch' },
    { name: 'India Credit Default Database Check', price: 50, tat: 'Instant', partnerNetwork: 'Unknown', method: 'Digital Fetch' },
  ],
  "Address Checks": [
    { name: 'Permanent Address check (Physical - PAN India Coverage)', price: 400, tat: 'T + 14 days', partnerNetwork: '4 Partners', method: 'BGV Partner' },
    { name: 'Current Address check (Physical - PAN India Coverage)', price: 400, tat: 'T + 14 days', partnerNetwork: 'Unknown', method: 'BGV Partner' },
    { name: 'Digital Address check', price: 200, tat: 'Instant', partnerNetwork: 'Unknown', method: 'Digital Address check' },
  ],
  "Education Checks": [
    { name: 'Highest Education*', price: 500, tat: 'T + 14 days', partnerNetwork: '3 Partners', method: 'User Upload' },
  ],
  "Employment Checks": [
    { name: 'Employment & Conduct (Per check) - Last 7 years', price: 2000, tat: 'T + 14 days', partnerNetwork: '3 Partners', method: 'User Upload' },
    { name: 'Self-Employment Check (Via Business PAN)', price: 100, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Fetch by PAN' },
    { name: 'PF UAN Advanced', price: 100, tat: 'Instant', partnerNetwork: '4 Partners', method: 'Fetch by Phone number' },
    { name: 'CV Validation', price: 250, tat: 'T + 7 days', partnerNetwork: '5 BGV Partners', method: 'User Upload' },
    { name: 'Directorship Check', price: 50, tat: 'Instant', partnerNetwork: '5 Data Partners', method: 'Fetch by PAN' },
    { name: 'Right to Work (Govt ID)', price: 60, tat: 'Instant', partnerNetwork: '6 Data Partners', method: 'Fetch by Valid India Govt. ID' },
  ],
  "Professional Checks": [
    { name: 'Professional Reference Check', price: 300, tat: 'T + 14 days', partnerNetwork: '5 BGV Partners', method: 'User Upload' },
  ]
}; 