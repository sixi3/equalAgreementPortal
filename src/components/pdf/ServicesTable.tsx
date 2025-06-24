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
});

export function ServicesTable() {
  const { state } = useContext(AgreementContext);
  const { journeys, priceOverrides, multipliers } = state;
  
  const flattenedChecks = journeys.flatMap(journey => 
    Object.keys(journey.selectedChecks)
      .filter(name => journey.selectedChecks[name])
      .map(checkName => {
        const checkCategory = Object.keys(idChecks).find(c => idChecks[c as keyof typeof idChecks].some(ch => ch.name === checkName)) as keyof typeof idChecks;
        const checkDetails = idChecks[checkCategory]?.find(c => c.name === checkName);
        const basePrice = priceOverrides[checkName] ?? checkDetails?.price ?? 0;
        const multiplier = multipliers[checkName] || 1;
        
        return {
          name: checkName,
          journeyName: journey.name,
          tat: checkDetails?.tat ?? '',
          partnerNetwork: checkDetails?.partnerNetwork ?? '',
          price: basePrice * multiplier,
        };
      })
  );

  if (flattenedChecks.length === 0) return null;

  return (
    <View style={{ marginTop: 15, marginBottom: 15 }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#374151', textTransform: 'uppercase', marginBottom: 10 }}>
        Selected Verification Services
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableColHeader, { width: '35%' }]}><Text style={styles.tableCellHeader}>Service Name</Text></View>
          <View style={[styles.tableColHeader, { width: '20%' }]}><Text style={styles.tableCellHeader}>Journey</Text></View>
          <View style={[styles.tableColHeader, { width: '15%' }]}><Text style={styles.tableCellHeader}>TAT</Text></View>
          <View style={[styles.tableColHeader, { width: '15%' }]}><Text style={styles.tableCellHeader}>Partner Network</Text></View>
          <View style={[styles.tableColHeader, { width: '15%' }]}><Text style={styles.tableCellHeader}>Price (INR)</Text></View>
        </View>
        
        {flattenedChecks.map(check => (
          <View style={styles.tableRow} key={`${check.journeyName}-${check.name}`}>
            <View style={[styles.tableCol, { width: '35%' }]}><Text style={styles.tableCell}>{check.name}</Text></View>
            <View style={[styles.tableCol, { width: '20%' }]}><Text style={styles.tableCell}>{check.journeyName}</Text></View>
            <View style={[styles.tableCol, { width: '15%' }]}><Text style={styles.tableCell}>{check.tat}</Text></View>
            <View style={[styles.tableCol, { width: '15%' }]}><Text style={styles.tableCell}>{check.partnerNetwork}</Text></View>
            <View style={[styles.tableCol, { width: '15%' }]}><Text style={styles.tableCell}>{check.price.toLocaleString('en-IN')}</Text></View>
          </View>
        ))}
      </View>
    </View>
  );
} 