import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { Invoice, Client, Company } from '../../lib/types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  invoiceDetails: {
    textAlign: 'right',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    width: '48%',
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  description: { width: '40%' },
  rate: { width: '20%', textAlign: 'right' },
  hours: { width: '20%', textAlign: 'right' },
  amount: { width: '20%', textAlign: 'right' },
  total: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 3,
  },
  totalLabel: {
    width: '20%',
    textAlign: 'right',
    paddingRight: 8,
  },
  totalAmount: {
    width: '20%',
    textAlign: 'right',
  },
  notes: {
    marginTop: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

interface PDFInvoiceTemplateProps {
  invoice: Invoice;
  client: Client;
  company: Company;
}

const PDFInvoiceTemplate: React.FC<PDFInvoiceTemplateProps> = ({
  invoice,
  client,
  company,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>B</Text>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={styles.invoiceDetails}>Invoice No: {invoice.invoiceNumber}</Text>
          <Text style={styles.invoiceDetails}>Date: {format(new Date(invoice.issueDate), 'dd MMMM yyyy')}</Text>
          <Text style={styles.invoiceDetails}>Due Date: {format(new Date(invoice.dueDate), 'dd MMMM yyyy')}</Text>
        </View>
      </View>

      {/* Company and Client Details */}
      <View style={styles.grid}>
        <View style={styles.column}>
          <Text style={{ fontWeight: 'bold' }}>From:</Text>
          <Text>{company.companyName}</Text>
          <Text>{company.name}</Text>
          <Text>{company.email}</Text>
          <Text>{company.phone}</Text>
          <Text>{company.address}</Text>
          <Text>{`${company.city}, ${company.state} ${company.zip}`}</Text>
        </View>
        <View style={styles.column}>
          <Text style={{ fontWeight: 'bold' }}>Bill To:</Text>
          <Text>{client.name}</Text>
          <Text>{client.email}</Text>
          <Text>{client.phone}</Text>
          <Text>{client.address}</Text>
          <Text>{`${client.city || ''} ${client.state || ''} ${client.zip || ''}`}</Text>
        </View>
      </View>

      {/* Invoice Items */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.rate}>Rate</Text>
          <Text style={styles.hours}>Hours</Text>
          <Text style={styles.amount}>Amount</Text>
        </View>

        {invoice.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.description}>{item.name}</Text>
            <Text style={styles.rate}>{`${item.currency} $${item.rate.toFixed(2)}`}</Text>
            <Text style={styles.hours}>{item.hours}</Text>
            <Text style={styles.amount}>{`${item.currency} $${item.total.toFixed(2)}`}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.total}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalAmount}>{`${invoice.items[0]?.currency || 'USD'} $${invoice.subtotal.toFixed(2)}`}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax:</Text>
            <Text style={styles.totalAmount}>{`${invoice.items[0]?.currency || 'USD'} $${invoice.tax.toFixed(2)}`}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>{`${invoice.items[0]?.currency || 'USD'} $${invoice.total.toFixed(2)}`}</Text>
          </View>
        </View>
      </View>

      {/* Notes */}
      {invoice.notes && (
        <View style={styles.notes}>
          <Text style={{ fontWeight: 'bold' }}>Notes:</Text>
          <Text>{invoice.notes}</Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
        <Text>Payment is due within {Math.ceil((new Date(invoice.dueDate).getTime() - new Date(invoice.issueDate).getTime()) / (1000 * 60 * 60 * 24))} days</Text>
      </View>
    </Page>
  </Document>
);

export default PDFInvoiceTemplate;

