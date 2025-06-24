import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
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
});

interface PdfHeaderProps {
  logoUrl?: string;
  agreementTitle: string;
}

export const PdfHeader = React.memo(({ logoUrl, agreementTitle }: PdfHeaderProps) => {
  return (
    <View style={styles.header}>
      {logoUrl ? (
        <Image style={styles.logo} src={logoUrl} />
      ) : (
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoPlaceholderText}>Client Logo</Text>
        </View>
      )}
      <Text style={styles.title}>{agreementTitle}</Text>
      <Image style={styles.logo} src="/equal-logo.png" />
    </View>
  );
});

PdfHeader.displayName = 'PdfHeader'; 