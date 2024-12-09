import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Timesheets from "./pages/Timesheets";
import Landing from "./pages/Landing";
import Clients from "./pages/Clients";
import InvoiceTemplates from "./pages/InvoiceTemplates";
import ThemeYTemplate from "./components/themes/Theme-Y";
import { sampleInvoiceData } from "./data/sampleInvoiceData";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/timesheets" element={<Timesheets />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/invoice-templates" element={<InvoiceTemplates />} />
            <Route 
              path="/invoice-preview" 
              element={
                <div className="p-4">
                  <ThemeYTemplate {...sampleInvoiceData} />
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