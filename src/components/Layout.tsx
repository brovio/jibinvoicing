import { Header } from "./Header";
import { Navigation } from "./Navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#4895EF]">
      <Header />
      <Navigation />
      <main className="pt-[130px] px-4 pb-8">{children}</main>
    </div>
  );
};