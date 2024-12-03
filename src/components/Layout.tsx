import { Header } from "./Header";
import { Navigation } from "./Navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <Navigation />
      <main className="pt-[95px] px-4">{children}</main>
    </div>
  );
};