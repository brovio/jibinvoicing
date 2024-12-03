import { Header } from "./Header";
import { Navigation } from "./Navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#4895EF]">
      <Header />
      <Navigation />
      <main className="pt-[95px] px-4">{children}</main>
    </div>
  );
};