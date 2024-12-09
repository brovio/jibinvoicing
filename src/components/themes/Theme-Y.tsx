import React from 'react';
import { InvoiceTemplateProps } from '../../lib/types';
import { InvoiceHeader } from '../invoice-templates/shared/InvoiceHeader';
import { CompanyDetails } from '../invoice-templates/shared/CompanyDetails';
import { InvoiceItems } from '../invoice-templates/shared/InvoiceItems';
import { PaymentSection } from '../invoice-templates/shared/PaymentSection';

export const ThemeYTemplate: React.FC<InvoiceTemplateProps> = (props) => {
  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <InvoiceHeader 
            invoiceNumber={props.invoiceNumber}
            issueDate={props.issueDate}
            dueDate={props.dueDate}
          />
          
          <CompanyDetails 
            COMPANY_INFO={props.COMPANY_INFO}
            client={props.client}
          />
          
          <InvoiceItems 
            items={props.items}
            formatter={props.formatter}
          />
          
          <PaymentSection 
            paymentOptions={props.paymentOptions}
            bankDetails={props.bankDetails}
          />
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