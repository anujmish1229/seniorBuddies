import { Instagram, Facebook, ArrowUp } from "lucide-react";
import titleImage from "@/assets/title.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden flex flex-col" style={{ height: '60vh' }}>
      {/* Social media links - top left */}
      <div className="absolute top-8 left-8 flex gap-6 z-10 font-bold">
        <a 
          href="https://www.instagram.com/seniorbuddiesdurham/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-foreground hover:text-primary transition-colors"
          aria-label="Instagram"
        >
          Instagram
        </a>
        <a 
          href="https://www.facebook.com/people/Senior-Buddies-Durham/61565582833845/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-foreground hover:text-primary transition-colors"
          aria-label="Facebook"
        >
          Facebook
        </a>
      </div>

      {/* Scroll to top button - top right */}
      <button
        onClick={scrollToTop}
        className="absolute top-8 right-8 z-10 text-primary-foreground hover:text-primary transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-8 w-8" />
      </button>

      {/* Full width title image at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <img 
          src={titleImage} 
          alt="Senior Buddies Title" 
          className="w-full h-auto object-contain"
        />
      </div>
    </footer>
  );
};

export default Footer;
