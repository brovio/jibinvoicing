import { Header } from "./Header";
import { Navigation } from "./Navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Header />
      <Navigation />
      <main className="pt-[120px] px-8 pb-8">{children}</main>
    </div>
  );
};