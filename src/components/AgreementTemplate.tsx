import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Link, Font } from '@react-pdf/renderer'
import { Check, Journey } from '@/types'
import { idChecks } from '@/lib/id-checks'

import InterRegular from '@fontsource/inter/files/inter-latin-400-normal.woff'
import InterBold from '@fontsource/inter/files/inter-latin-700-normal.woff'
import InterItalic from '@fontsource/inter/files/inter-latin-400-italic.woff'

interface AgreementTemplateProps {
  brandName: string
  logoUrl?: string
  journeys: Journey[]
  totalPrice: number
  priceOverrides: { [key: string]: number };
  multipliers: { [key: string]: number };
  setupFee: number;
  annualFee: number;
  defaultSetupFee: number;
  defaultAnnualFee: number;
}

Font.register({
  family: 'Inter',
  fonts: [
    { src: InterRegular },
    { src: InterBold, fontWeight: 'bold' },
    { src: InterItalic, fontStyle: 'italic' },
  ],
})

const valueAddedServices = [
  { name: 'Equal Console', description: 'Equal console access shall be provided for end-end visibility on candidate e-onboarding status' },
  { name: 'Equal Gateway instances', description: "Equal will provide unique gateway instances configuring the BGV checks for each Keka's customer" },
  { name: 'Equal Reporting', description: 'Equal shall provide outreach logs for audit purpose' },
  { name: 'Business Rule Engine', description: 'Equal will provide insights on the BGV reports based on business logic provided by Merchant' },
  { name: 'Routing Engine', description: 'Equal will dynamically route request between partners for higher success rate' },
];

const aggregatorServices = [
  { name: 'Partner Network Optimisation', description: 'Equal will constantly be optimising our partner network for higher success rate for every module opted' },
  { name: 'Partner Additions', description: 'Equal will add more reliable partners for every module who has best-in-class network uptime with higher throughput' },
  { name: 'Cloud Optimisation', description: 'Equal will leverage Amazon cloud infrastructure CDN services for higher network availability' },
  { name: 'Cloud Security', description: 'Equal will leverage highest level of cyber security mesures enabling zero trust security architecture' },
];

const pricingDetails = [
  { term: 'Set-up Fee + Integration cost (One time Fee)', amount: 'INR 10,00,000', strikethrough: true },
  { term: 'Value-added Service paid yearly once (Prepay Annual)', amount: 'INR 12,00,000', strikethrough: true },
  { term: 'Payment terms', amount: 'Post-pay Monthly - Based on actual consumption' },
];

const pricingNotes = [
  "A minor % of Education verification may incur an additional challan cost that's charged by the Universities at the time of verifications - this charge will be passed on at actuals",
  "AMC + Value-added Service paid yearly once (Prepay Annual) that includes Updates, Patches, Bug fixes & Customer Support",
  "All prices are exclusive of applicable taxes"
];

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: 10,
    fontFamily: 'Inter',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: 2,
    borderBottomColor: '#00b140',
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 24,
    objectFit: 'contain',
  },
  logoPlaceholder: {
    width: 120,
    height: 30,
    border: '1px dashed #9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholderText: {
    fontSize: 8,
    color: '#6b7280',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
  },
  brandSection: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 5,
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#e5e7eb',
    backgroundColor: '#00b140',
    padding: 8,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#e5e7eb',
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tableCell: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#000000',
  },
  totalSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0fdf4',
    borderRadius: 5,
    borderLeft: 4,
    borderLeftColor: '#22c55e',
  },
  totalLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B', // slate-800
  },
  pricingTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  pricingTableCellTerm: {
    fontSize: 9,
    color: '#475569', // slate-600
  },
  pricingTableCellAmount: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1E293B', // slate-800
  },
  strikethroughText: {
    textDecoration: 'line-through',
    color: '#1e1e1e', // slate-400
    fontSize: 9,
    fontWeight: 'bold',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  notesSection: {
    marginTop: 12,
  },
  noteText: {
    fontSize: 8,
    color: '#6b7280',
    lineHeight: 1.4,
    marginBottom: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0', // slate-200
    marginVertical: 12,
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: 1,
    borderTopColor: '#e5e7eb',
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'center',
  },
  date: {
    fontSize: 9,
    color: '#6b7280',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
})

export function AgreementTemplate({ brandName, logoUrl, journeys, totalPrice, priceOverrides, multipliers, setupFee, annualFee, defaultSetupFee, defaultAnnualFee }: AgreementTemplateProps) {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  // Derive flattened checks from journeys for downstream logic (insights, notes, etc.)
  const selectedChecks: Check[] = journeys
    .flatMap(j => Object.keys(j.selectedChecks).filter(name => j.selectedChecks[name]))
    .map(name => {
      for (const category in idChecks) {
        const check = idChecks[category as keyof typeof idChecks].find(c => c.name === name);
        if (check) return check;
      }
      return null;
    })
    .filter((c): c is Check => c !== null);

  const isEducationCheckSelected = selectedChecks.some(check => check.name === 'Highest Education*');
  const checksWithInsights = selectedChecks.filter(check => check.insights);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          {logoUrl ? (
            <Image style={styles.logo} src={logoUrl} />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoPlaceholderText}>Client Logo</Text>
            </View>
          )}
          <Text style={styles.title}>ID Verification Agreement</Text>
          <Image style={styles.logo} src="/equal-logo.png" />
        </View>

        {/* Agreement Text */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Agreement Terms</Text>
            <Text style={styles.date}>Date: {currentDate}</Text>
          </View>
          <Text style={{ fontSize: 10, lineHeight: 1.5, color: '#374151', marginBottom: 10 }}>
            This agreement is entered into between Equal Digital and {brandName || '[Client Name]'} for the provision 
            of identity verification services as detailed below. The services will be delivered according to the 
            specified turnaround times and through our verified partner network.
          </Text>
        </View>

        {/* Selected Checks Table */}
        {selectedChecks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Verification Services</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Service Name</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Journey</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>TAT</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Partner Network</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Price (INR)</Text>
                </View>
              </View>
              
              {/* Table Rows */}
              {journeys.map(journey => 
                Object.keys(journey.selectedChecks)
                  .filter(name => journey.selectedChecks[name])
                  .map(checkName => {
                    const check = selectedChecks.find(c => c.name === checkName);
                    if (!check) return null;
                    const basePrice = priceOverrides[check.name] ?? check.price;
                    const multiplier = multipliers[check.name] || 1;
                    const finalPrice = basePrice * multiplier;
                    return (
                      <View style={styles.tableRow} key={check.name}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{check.name}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{journey.name}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{check.tat}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{check.partnerNetwork}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>INR {finalPrice}</Text>
                        </View>
                      </View>
                    );
                  })
              )}
            </View>
          </View>
        )}

        {/* Total Price */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Cost per Onboarding:</Text>
          <Text style={styles.totalAmount}>INR {totalPrice.toFixed(2)}</Text>
          
          <View style={styles.separator} />

          <View>
            <View style={styles.pricingTableRow}>
                <Text style={styles.pricingTableCellTerm}>Set-up Fee + Integration cost (One time Fee)</Text>
                <View style={styles.amountContainer}>
                    {setupFee === defaultSetupFee ? (
                        <Text style={styles.strikethroughText}>
                            INR {new Intl.NumberFormat('en-IN').format(setupFee)}
                        </Text>
                    ) : (
                        <Text style={styles.strikethroughText}>
                            INR {new Intl.NumberFormat('en-IN').format(setupFee)}
                        </Text>
                    )}
                </View>
            </View>
            <View style={styles.pricingTableRow}>
                <Text style={styles.pricingTableCellTerm}>Value-added Service paid yearly once (Prepay Annual)</Text>
                <View style={styles.amountContainer}>
                    {annualFee === defaultAnnualFee ? (
                        <Text style={styles.strikethroughText}>
                            INR {new Intl.NumberFormat('en-IN').format(annualFee)}
                        </Text>
                    ) : (
                        <Text style={styles.strikethroughText}>
                            INR {new Intl.NumberFormat('en-IN').format(annualFee)}
                        </Text>
                    )}
                </View>
            </View>
          </View>

          <View style={styles.notesSection}>
            {pricingNotes.map((note, index) => {
              if (note.includes('Education verification') && !isEducationCheckSelected) {
                return null;
              }
              return <Text key={index} style={styles.noteText}>* {note}</Text>
            })}
          </View>
        </View>

        {/* Insights Table */}
        {checksWithInsights.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Insights</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={[styles.tableColHeader, { width: '30%' }]}>
                  <Text style={styles.tableCellHeader}>Service</Text>
                </View>
                <View style={[styles.tableColHeader, { width: '70%' }]}>
                  <Text style={styles.tableCellHeader}>Insight Description</Text>
                </View>
              </View>
              
              {/* Table Rows */}
              {checksWithInsights.map((check, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={[styles.tableCol, { width: '30%' }]}>
                    <Text style={styles.tableCell}>{check.name}</Text>
                  </View>
                  <View style={[styles.tableCol, { width: '70%' }]}>
                    <Text style={styles.tableCell}>{check.insights}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Value Added Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Value-added Services</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={[styles.tableColHeader, { width: '30%' }]}>
                <Text style={styles.tableCellHeader}>Service</Text>
              </View>
              <View style={[styles.tableColHeader, { width: '70%' }]}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
            </View>
            
            {/* Table Rows */}
            {valueAddedServices.map((service, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={[styles.tableCol, { width: '30%' }]}>
                  <Text style={styles.tableCell}>{service.name}</Text>
                </View>
                <View style={[styles.tableCol, { width: '70%' }]}>
                  <Text style={styles.tableCell}>{service.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Aggregator Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aggregator Services</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={[styles.tableColHeader, { width: '30%' }]}>
                <Text style={styles.tableCellHeader}>Service</Text>
              </View>
              <View style={[styles.tableColHeader, { width: '70%' }]}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
            </View>
            
            {/* Table Rows */}
            {aggregatorServices.map((service, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={[styles.tableCol, { width: '30%' }]}>
                  <Text style={styles.tableCell}>{service.name}</Text>
                </View>
                <View style={[styles.tableCol, { width: '70%' }]}>
                  <Text style={styles.tableCell}>{service.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          <Text style={{ fontSize: 9, lineHeight: 1.4, color: '#374151', marginTop: 10 }}>
            • All verification services will be provided through our certified partner network{'\n'}
            • Turnaround times are indicative and may vary based on data availability{'\n'}
            • Pricing is per verification check and excludes applicable taxes{'\n'}
            • This agreement is valid for 30 days from the date of issue{'\n'}
            • All services are subject to Equal Digital's standard terms and conditions
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            This document is generated automatically by Equal Digital's Agreement Portal.{'\n'}
            For questions or clarifications, please contact our support team at{' '}
            <Link src="mailto:support@equal.in" style={{ color: '#00b140', textDecoration: 'none' }}>
              support@equal.in
            </Link>
          </Text>
        </View>
      </Page>
    </Document>
  )
} 