import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  useEffect(() => {
    document.title = title ? `${title} | Senior Buddies` : "Senior Buddies | Bridging Generations in Durham Region";
  }, [title]);

  return (
  <div className="flex min-h-screen flex-col">
    <a
      href="#main"
      className="sr-only z-50 bg-sun px-4 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      {children}
    </main>
    <Footer />
  </div>
  );
};

export default Layout;
