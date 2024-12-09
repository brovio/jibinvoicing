import React from 'react';
import { InvoiceTemplateProps } from '../../../lib/types';

type PaymentSectionProps = Pick<InvoiceTemplateProps, 'paymentOptions' | 'bankDetails'>;

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentOptions,
  bankDetails,
}) => {
  return (
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
  );
};