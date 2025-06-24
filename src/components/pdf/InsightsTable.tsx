import React, { useContext } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { AgreementContext } from '@/lib/AgreementContext';
import { idChecks } from '@/lib/id-checks';

const styles = StyleSheet.create({
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
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#e5e7eb',
    backgroundColor: '#00b140',
    padding: 8,
  },
  tableCol: {
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
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
  },
});

interface InsightsTableProps {}

export function InsightsTable({}: InsightsTableProps) {
  const { state } = useContext(AgreementContext);
  const { journeys } = state;

  const checksWithInsights = journeys
    .flatMap(j => Object.keys(j.selectedChecks).filter(name => j.selectedChecks[name]))
    .map(name => {
      for (const category in idChecks) {
        const check = idChecks[category as keyof typeof idChecks].find(c => c.name === name);
        if (check && check.insights) return check;
      }
      return null;
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);
  
  if (checksWithInsights.length === 0) return null;

  return (
    <View style={{ marginBottom: 15 }}>
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
  );
} 