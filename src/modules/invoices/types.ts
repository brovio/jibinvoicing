export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  timesheetIds: string[];
  issueDate: Date;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}