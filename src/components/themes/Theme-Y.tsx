import React from 'react';
import { format } from 'date-fns';
import { InvoiceTemplateProps } from '../../lib/types';

export const ThemeYTemplate: React.FC<InvoiceTemplateProps> = ({
  invoiceNumber,
  issueDate,
  dueDate,
  items,
  client,
  COMPANY_INFO,
  bankDetails,
  paymentOptions,
  formatter
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const vat = subtotal * 0.1; // 10% VAT
  const total = subtotal + vat;

  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">B</span>
              </div>
            </div>

            <div className="text-right">
              <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
              <div className="text-gray-600">
                <p>Invoice No: {invoiceNumber}</p>
                <p>Date: {format(issueDate, 'dd MMMM yyyy')}</p>
                <p>Due Date: {format(dueDate, 'dd MMMM yyyy')}</p>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold mb-2">From:</h2>
              <div className="space-y-1">
                <p className="font-semibold">{COMPANY_INFO.name}</p>
                <p>{COMPANY_INFO.email}</p>
                <p>{COMPANY_INFO.phone}</p>
                <p style={{ whiteSpace: 'pre-line' }}>{COMPANY_INFO.address}</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
              <h2 className="font-bold mb-2">Bill To:</h2>
              <div className="space-y-1">
                <p className="font-semibold">{client.name}</p>
                <p>{client.contactName}</p>
                <p>{client.email}</p>
                <p>{client.phone}</p>
                <p style={{ whiteSpace: 'pre-line' }}>{client.address}</p>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mt-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6">Invoice Breakdown</th>
                    <th className="text-right py-4 px-6">Rate</th>
                    <th className="text-right py-4 px-6">Hours</th>
                    <th className="text-right py-4 px-6">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4 px-6">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                      </td>
                      <td className="text-right py-4 px-6">{formatter.format(item.rate)}</td>
                      <td className="text-right py-4 px-6">{item.hours}</td>
                      <td className="text-right py-4 px-6">{formatter.format(item.total)}</td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr className="border-b border-gray-200">
                      <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
                        No items to display
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {/* Summary Section */}
              <div className="border-t border-gray-200 bg-gray-50">
                <div className="flex">
                  <div className="w-1/4 p-4">
                    <span className="font-semibold">Summary</span>
                  </div>
                  <div className="flex-1 p-4 flex justify-end">
                    <div className="flex gap-16">
                      <div>
                        <div>Sub Total</div>
                        <div className="mt-2">+ VAT 10%</div>
                        <div className="mt-2 font-bold">Grand Total</div>
                      </div>
                      <div className="text-right">
                        <div>{formatter.format(subtotal)}</div>
                        <div className="mt-2">+ {formatter.format(vat)}</div>
                        <div className="mt-2 font-bold">{formatter.format(total)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-4">Pay with Card</h3>
              <div className="grid grid-cols-2 gap-4">
                {paymentOptions.map((option) => (
                  <button
                    key={option.name}
                    className="bg-white p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    {option.icon} {option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-4">Pay by Bank</h3>
              <div className="space-y-2 text-gray-600">
                {bankDetails.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center p-8 bg-gray-50 border-t border-gray-200">
          <a 
            href="https://brov.io" 
            className="text-black font-bold text-lg tracking-widest hover:text-gray-800 transition-colors"
          >
            brov.io
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThemeYTemplate;