export interface InvoiceItem {
  name: string;
  description?: string;
  rate: number;
  hours: number;
  total: number;
  currency: string;
}

export interface Client {
  name: string;
  contactName?: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface Company {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Invoice {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

export interface InvoiceTemplateProps {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  client: Client;
  COMPANY_INFO: Company;
  bankDetails: string[];
  paymentOptions: Array<{ name: string; icon: React.ReactNode }>;
  formatter: Intl.NumberFormat;
}