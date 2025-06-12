import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { Check } from '@/types'

interface AgreementTemplateProps {
  brandName: string
  logoUrl?: string
  selectedChecks: Check[]
  totalPrice: number
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: 2,
    borderBottomColor: '#22c55e',
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 30,
    objectFit: 'contain',
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
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
    backgroundColor: '#f3f4f6',
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
    color: '#374151',
  },
  tableCell: {
    fontSize: 9,
    color: '#6b7280',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
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
    textAlign: 'right',
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 20,
  },
})

export function AgreementTemplate({ brandName, logoUrl, selectedChecks, totalPrice }: AgreementTemplateProps) {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {logoUrl && <Image style={styles.logo} src={logoUrl} />}
          <Text style={styles.title}>ID Verification Agreement</Text>
          <View style={{ width: 120 }} />
        </View>

        {/* Date */}
        <Text style={styles.date}>Date: {currentDate}</Text>

        {/* Brand Section */}
        {brandName && (
          <View style={styles.brandSection}>
            <Text style={styles.sectionTitle}>Client Information</Text>
            <Text style={styles.brandName}>{brandName}</Text>
            <Text style={{ fontSize: 9, color: '#6b7280' }}>
              This agreement outlines the ID verification services to be provided.
            </Text>
          </View>
        )}

        {/* Agreement Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agreement Terms</Text>
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
                  <Text style={styles.tableCellHeader}>Method</Text>
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
              {selectedChecks.map((check, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{check.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{check.method}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{check.tat}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{check.partnerNetwork}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>₹{check.price}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Total Price */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Cost per Onboarding:</Text>
          <Text style={styles.totalAmount}>INR ₹{totalPrice}</Text>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          <Text style={{ fontSize: 9, lineHeight: 1.4, color: '#374151' }}>
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
            For questions or clarifications, please contact our support team.
          </Text>
        </View>
      </Page>
    </Document>
  )
} 