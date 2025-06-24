import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
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
});

interface PricingSummaryProps {
  totalPrice: number;
  setupFee: number;
  annualFee: number;
  defaultSetupFee: number;
  defaultAnnualFee: number;
  pricingNotes: string[];
  isEducationCheckSelected: boolean;
}

export const PricingSummary = React.memo(({ totalPrice, setupFee, annualFee, defaultSetupFee, defaultAnnualFee, pricingNotes, isEducationCheckSelected }: PricingSummaryProps) => {
  return (
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
  );
});

PricingSummary.displayName = 'PricingSummary'; 