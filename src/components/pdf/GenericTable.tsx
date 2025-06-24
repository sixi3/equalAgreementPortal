import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ValueAddedService } from '@/types';

const styles = StyleSheet.create({
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

interface GenericTableProps {
  title: string;
  data: ValueAddedService[];
}

export const GenericTable = React.memo(({ title, data }: GenericTableProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
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
        {data.map((service, index) => (
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
  );
});

GenericTable.displayName = 'GenericTable'; 