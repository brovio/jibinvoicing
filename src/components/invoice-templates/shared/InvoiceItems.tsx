import React from 'react';
import { InvoiceTemplateProps } from '../../../lib/types';

type InvoiceItemsProps = Pick<InvoiceTemplateProps, 'items' | 'formatter'>;

export const InvoiceItems: React.FC<InvoiceItemsProps> = ({
  items,
  formatter,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const vat = subtotal * 0.1; // 10% VAT
  const total = subtotal + vat;

  return (
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
  );
};