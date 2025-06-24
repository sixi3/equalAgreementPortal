import React, { useContext } from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'
import { AgreementContext } from '@/lib/AgreementContext'
import { PdfHeader } from './pdf/PdfHeader'
import { ServicesTable } from './pdf/ServicesTable'
import { InsightsTable } from './pdf/InsightsTable'
import { GenericTable } from './pdf/GenericTable'
import { PricingSummary } from './pdf/PricingSummary'
import { TermsAndConditions } from './pdf/TermsAndConditions'
import { PdfFooter } from './pdf/PdfFooter'

import InterRegular from '@fontsource/inter/files/inter-latin-400-normal.woff'
import InterSemiBold from '@fontsource/inter/files/inter-latin-600-normal.woff'
import { idChecks } from '@/lib/id-checks'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    padding: 40,
    lineHeight: 1.5,
    color: '#333',
  },
  section: {
    marginBottom: 15,
  },
  introText: {
    textAlign: 'justify',
  },
})

// Font registration
Font.register({
  family: 'Inter',
  fonts: [
    { src: InterRegular },
    { src: InterSemiBold, fontWeight: 600 },
  ],
})

// Hardcoded default fees for display logic
const DEFAULT_SETUP_FEE = 1000000;
const DEFAULT_ANNUAL_FEE = 1200000;

export const AgreementTemplate = () => {
  const { state } = useContext(AgreementContext)
  const { 
    brandName, 
    logoUrl, 
    agreementTitle, 
    agreementIntro, 
    valueAddedServices, 
    aggregatorServices, 
    pricingNotes, 
    termsAndConditions,
    journeys,
    priceOverrides,
    multipliers,
    setupFee,
    annualFee,
  } = state

  const totalPrice = journeys.reduce((total, journey) => {
    const journeyPrice = Object.keys(journey.selectedChecks).reduce((acc, checkName) => {
        const basePrice = priceOverrides[checkName] ?? idChecks[Object.keys(idChecks).find(c => idChecks[c as keyof typeof idChecks].some(ch => ch.name === checkName)) as keyof typeof idChecks]?.find(c => c.name === checkName)?.price ?? 0;
        const multiplier = multipliers[checkName] || 1;
        return acc + (basePrice * multiplier);
    }, 0);
    return total + journeyPrice;
  }, 0);

  const isEducationCheckSelected = journeys.some(j => j.selectedChecks['Highest Education*']);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <PdfHeader logoUrl={logoUrl || undefined} agreementTitle={agreementTitle} />

        {/* Agreement Text */}
        <View style={styles.section}>
          <Text style={styles.introText}>
            {agreementIntro.replace('{brandName}', brandName || '[Client Name]')}
          </Text>
        </View>

        {/* Services Tables */}
        <ServicesTable />
        
        <PricingSummary 
            totalPrice={totalPrice} 
            setupFee={setupFee} 
            annualFee={annualFee}
            defaultSetupFee={DEFAULT_SETUP_FEE}
            defaultAnnualFee={DEFAULT_ANNUAL_FEE}
            pricingNotes={pricingNotes}
            isEducationCheckSelected={isEducationCheckSelected}
        />

        {/* Add spacing above InsightsTable */}
        <View style={{ marginTop: 24 }}>
          <InsightsTable />
        </View>
        
        <GenericTable title="Value-added Services" data={valueAddedServices} />

        <GenericTable title="Aggregator Services" data={aggregatorServices} />

        <TermsAndConditions termsAndConditions={termsAndConditions} />

        <PdfFooter />
      </Page>
    </Document>
  )
} 