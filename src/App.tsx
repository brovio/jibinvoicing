import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import ThemeYTemplate from "./components/themes/Theme-Y";

const queryClient = new QueryClient();

// Sample data for the invoice preview
const sampleData = {
  invoiceNumber: "INV-001",
  issueDate: new Date(),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  items: [
    {
      name: "Web Development",
      description: "Frontend development services",
      rate: 100,
      hours: 40,
      total: 4000,
      currency: "USD"
    }
  ],
  client: {
    name: "Acme Corp",
    contactName: "John Doe",
    email: "john@acme.com",
    phone: "+1 234 567 890",
    address: "123 Business Street\nSuite 100",
    city: "San Francisco",
    state: "CA",
    zip: "94107"
  },
  COMPANY_INFO: {
    name: "Jane Smith",
    companyName: "Dev Solutions Inc",
    email: "jane@devsolutions.com",
    phone: "+1 987 654 321",
    address: "456 Tech Avenue",
    city: "San Francisco",
    state: "CA",
    zip: "94108"
  },
  bankDetails: [
    "Bank: Silicon Valley Bank",
    "Account: 1234567890",
    "Routing: 987654321",
    "SWIFT: SVBKUS6S"
  ],
  paymentOptions: [
    { name: "Credit Card", icon: "💳" },
    { name: "PayPal", icon: "🅿️" }
  ],
  formatter: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/invoice-preview" 
              element={
                <div className="p-4">
                  <ThemeYTemplate {...sampleData} />
                </div>
              } 
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;