import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col">
      <Header />
      <Navigation />
      <main className="pt-[130px] px-6 pb-6 flex-grow">
        <div className="h-full pb-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};