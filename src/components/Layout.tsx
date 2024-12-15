import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col">
      <Header />
      <Navigation />
      <main className="pt-[130px] flex-grow">
        <div className="px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};