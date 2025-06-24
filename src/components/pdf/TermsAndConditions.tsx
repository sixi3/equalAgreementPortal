import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  bulletPoint: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 4,
  }
});

interface TermsAndConditionsProps {
  termsAndConditions: string[];
}

export const TermsAndConditions = React.memo(({ termsAndConditions }: TermsAndConditionsProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Terms & Conditions</Text>
      {termsAndConditions.map((term, index) => (
        <Text key={index} style={styles.bulletPoint}>• {term}</Text>
      ))}
    </View>
  );
});

TermsAndConditions.displayName = 'TermsAndConditions'; 