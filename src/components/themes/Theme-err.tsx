import React from 'react';
import { format } from 'date-fns';
import { Client } from '@/lib/types';

interface InvoiceItem {
  name: string;
  description: string;
  rate: number;
  currency: string;
  hours: string;
  total: number;
}

interface InvoiceTemplateProps {
  client: Client | null;
  items: InvoiceItem[];
  issueDate: Date;
  dueDate: Date;
  notes?: string;
}

const InvoiceTemplate = ({ client, items, issueDate, dueDate, notes }: InvoiceTemplateProps) => {
  const paymentOptions = [
    { name: 'Wise', icon: '💳' },
    { name: 'PayPal', icon: '💰' },
    { name: 'Revolut', icon: '🏦' },
    { name: 'Stripe', icon: '💳' }
  ];

  const bankDetails = [
    'Bank: First International Bank',
    'Account Name: Brovio Ltd',
    'Account Number: 12345678',
    'Sort Code: 12-34-56'
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = 0; // TODO: Make configurable
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">B</span>
              </div>
            </div>

            <div className="text-right">
              <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
              <div className="text-gray-600">
                <p>Invoice No: {Math.floor(Math.random() * 1000000)}</p>
                <p>Date: {format(issueDate, 'dd MMMM yyyy').toUpperCase()}</p>
                <p>Due Date: {format(dueDate, 'dd MMMM yyyy').toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold mb-2">From:</h2>
              <div className="space-y-1">
                <p className="font-semibold">Brovio Ltd</p>
                <p>John Smith</p>
                <p>contact@brov.io</p>
                <p>+44 123 456 789</p>
                <p>123 Tech Street, Digital City</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 shadow-sm">
              <h2 className="font-bold mb-2">Bill To:</h2>
              <div className="space-y-1">
                <p className="font-semibold">{client?.name || 'Client Name'}</p>
                <p>{client?.contactName || 'Contact Name'}</p>
                <p>{client?.email || 'client@example.com'}</p>
                <p>{client?.phone || '+1 234 567 890'}</p>
                <p>{client?.address || 'Client Address'}</p>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mt-8">
            <table className="w-full">
              <thead>
                <tr className="border-y">
                  <th className="py-2 text-left">Item</th>
                  <th className="py-2 text-left">Description</th>
                  <th className="py-2 text-right">Rate</th>
                  <th className="py-2 text-right">Hours</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((item, index) => (
                  <tr key={index} className="text-gray-600">
                    <td className="py-3">{item.name}</td>
                    <td className="py-3">{item.description}</td>
                    <td className="py-3 text-right">{item.currency} ${item.rate.toFixed(2)}</td>
                    <td className="py-3 text-right">{item.hours}</td>
                    <td className="py-3 text-right">{item.currency} ${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t">
                <tr>
                  <td colSpan={3}></td>
                  <td className="py-3 text-right font-bold">Subtotal:</td>
                  <td className="py-3 text-right">{items[0]?.currency || 'USD'} ${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                  <td className="py-3 text-right font-bold">Tax:</td>
                  <td className="py-3 text-right">{items[0]?.currency || 'USD'} ${tax.toFixed(2)}</td>
                </tr>
                <tr className="font-bold">
                  <td colSpan={3}></td>
                  <td className="py-3 text-right">Total:</td>
                  <td className="py-3 text-right">{items[0]?.currency || 'USD'} ${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Notes */}
          {notes && (
            <div className="mt-8">
              <h2 className="font-bold mb-2">Notes:</h2>
              <p className="text-gray-600">{notes}</p>
            </div>
          )}

          {/* Payment Details */}
          <div className="mt-8 space-y-4">
            <div>
              <h2 className="font-bold mb-2">Payment Options:</h2>
              <div className="flex space-x-4">
                {paymentOptions.map((option) => (
                  <div
                    key={option.name}
                    className="flex items-center space-x-1 text-gray-600"
                  >
                    <span>{option.icon}</span>
                    <span>{option.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-bold mb-2">Bank Details:</h2>
              <div className="space-y-1 text-gray-600">
                {bankDetails.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-8">
            <h2 className="font-bold mb-2">Terms & Conditions:</h2>
            <p className="text-gray-600">
              Payment is due within {Math.ceil((dueDate.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
