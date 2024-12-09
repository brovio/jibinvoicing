import { Header } from "./Header";
import { Navigation } from "./Navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Header />
      <Navigation />
      <main className="pt-[130px] px-6 pb-6">{children}</main>
    </div>
  );
};