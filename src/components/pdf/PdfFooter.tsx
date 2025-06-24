import React from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: 1,
    borderTopColor: '#e5e7eb',
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export function PdfFooter() {
  return (
    <View style={styles.footer}>
      <Text>
        This document is generated automatically by Equal Digital's Agreement Portal.{'\n'}
        For questions or clarifications, please contact our support team at{' '}
        <Link src="mailto:support@equal.in" style={{ color: '#00b140', textDecoration: 'none' }}>
          support@equal.in
        </Link>
      </Text>
    </View>
  );
} 