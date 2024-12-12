import React from 'react';
import { format } from 'date-fns';
import { InvoiceTemplateProps } from '../../../lib/types';

type HeaderProps = Pick<InvoiceTemplateProps, 'invoiceNumber' | 'issueDate' | 'dueDate'>;

export const InvoiceHeader: React.FC<HeaderProps> = ({
  invoiceNumber,
  issueDate,
  dueDate,
}) => {
  return (
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
  );
};