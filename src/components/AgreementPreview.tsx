'use client';

import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 32,
    width: 'auto',
    maxWidth: 150,
  },
  logoPlaceholder: {
    width: 150,
    height: 32,
    border: '1px dashed #999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholderText: {
    fontSize: 10,
    color: '#666',
  },
  brandNameContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    textDecoration: 'underline',
  },
  table: {
    display: "flex",
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    fontSize: 10,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 9,
  },
  total: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

interface AgreementPreviewProps {
  brandName: string;
  logoUrl: string | null;
  selectedChecks: { name: string; price: number; tat: string; method: string }[];
  totalPrice: number;
}

export function AgreementPreview({ brandName, logoUrl, selectedChecks, totalPrice }: AgreementPreviewProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {logoUrl ? (
              <Image src={logoUrl} style={styles.logo} />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoPlaceholderText}>Client Logo</Text>
              </View>
            )}
            <Image src="/Equal logo (1).png" style={styles.logo} />
          </View>
          <View style={styles.brandNameContainer}>
            <Text style={styles.brandName}>Equal Digital BGV Commerical Proposal for {brandName || 'Your Brand Name'}</Text>
          </View>
        </View>

        <Text style={styles.title}>Verification Services Agreement</Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Verification Check</Text>
            <Text style={styles.tableColHeader}>Method</Text>
            <Text style={styles.tableColHeader}>Turnaround Time (TAT)</Text>
            <Text style={styles.tableColHeader}>Price (INR)</Text>
          </View>
          {/* Table Rows */}
          {selectedChecks.map((check) => (
            <View key={check.name} style={styles.tableRow}>
              <Text style={styles.tableCol}>{check.name}</Text>
              <Text style={styles.tableCol}>{check.method}</Text>
              <Text style={styles.tableCol}>{check.tat}</Text>
              <Text style={styles.tableCol}>₹{check.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.total}>Total per Onboard: INR {totalPrice.toFixed(2)}</Text>
      </Page>
    </Document>
  );
} 