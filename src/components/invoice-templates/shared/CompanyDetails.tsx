import React from 'react';
import { InvoiceTemplateProps } from '../../../lib/types';

type CompanyDetailsProps = Pick<InvoiceTemplateProps, 'COMPANY_INFO' | 'client'>;

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  COMPANY_INFO,
  client,
}) => {
  return (
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
  );
};