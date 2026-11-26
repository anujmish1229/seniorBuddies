import { Link, NavLink } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, pages } from "@/data/site";
import logo from "@/assets/nav-logo.png";

const linkClass =
  "border-b-[3px] border-transparent py-1 font-bold text-ink-soft transition-colors hover:text-ink aria-[current=page]:border-sun aria-[current=page]:text-ink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // While the phone menu is open: Esc or a click outside closes it.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [isOpen]);

  // Slide the bar away once the visitor has scrolled down into the footer.
  const [inFooter, setInFooter] = useState(false);
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      setInFooter(window.scrollY > 80 && footer.getBoundingClientRect().top < window.innerHeight * 0.5);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const close = () => setIsOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-rule bg-paper transition-transform duration-300 focus-within:translate-y-0 ${
        inFooter && !isOpen ? "-translate-y-full" : ""
      }`}
    >
      <nav aria-label="Main" className="container flex h-20 items-center justify-between gap-6">
        <Link to="/" onClick={close} className="shrink-0">
          <img src={logo} alt="Senior Buddies home" width={1641} height={469} className="h-11 w-auto md:h-12" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={linkClass}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button asChild size="sm">
            <NavLink to={pages.join.path}>{pages.join.name}</NavLink>
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="phone-menu"
          className="-mr-2 flex min-h-12 items-center gap-2 rounded-md px-2 font-bold md:hidden"
        >
          {isOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          Menu
        </button>
      </nav>

      {isOpen && (
        <div ref={panelRef} id="phone-menu" className="on-dark border-t border-ink bg-ink text-paper md:hidden">
          <ul className="container flex flex-col py-4">
            {[pages.home, ...navLinks].map((link) => (
              <li key={link.path} className="border-b border-paper/15">
                <NavLink
                  to={link.path}
                  onClick={close}
                  end
                  className="flex min-h-14 items-center font-display text-2xl font-semibold aria-[current=page]:text-sun"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li className="pt-5 pb-2">
              <Button asChild variant="inverse" className="w-full">
                <NavLink to={pages.join.path} onClick={close}>
                  {pages.join.name}
                </NavLink>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
