import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { pages, slogan, social } from "@/data/site";
import wordmark from "@/assets/title.webp";
import BalloonsToTop from "./BalloonsToTop";

const navItems = [pages.home, pages.about, pages.team, pages.events, pages.contact, pages.join];

// Page links and social links share one ruled-row style so they read as one block.
const rowClass =
  "group flex items-center justify-between border-b border-paper/25 py-2 font-display text-xl font-semibold hover:text-sun md:py-3 md:text-3xl";
const headingClass = "mb-2 border-b border-paper/25 pb-3 font-body text-base font-bold text-shirt";

const Footer = () => (
  <footer id="site-footer" className="on-dark flex h-svh flex-col overflow-hidden bg-ink text-paper [@media(max-height:560px)]:h-auto">
    <div className="container grid w-full gap-8 pt-12 md:gap-14 md:pt-24 lg:grid-cols-12 lg:gap-12">
      <p className="font-display text-4xl leading-[1.02] font-semibold md:text-7xl lg:col-span-6 lg:text-6xl xl:text-7xl">{slogan}</p>

      <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:col-span-6 lg:col-start-7">
        <nav aria-label="Footer">
          <h2 className={headingClass}>Pages</h2>
          <ul>
            {navItems.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={rowClass}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Follow us</h2>
          <ul>
            {social.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  {s.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ArrowUpRight
                    className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center sm:mt-10 sm:justify-start">
            <BalloonsToTop />
          </div>
        </div>
      </div>
    </div>

    {/* The full Senior Buddies wordmark, edge to edge, pinned to the bottom of the footer, which is exactly one screen tall. */}
    <div className="mt-auto px-4 pt-8 pb-5 md:px-8 md:pt-16 md:pb-8">
      <img src={wordmark} alt="Senior Buddies" width={2400} height={314} className="h-auto w-full" />
      <p className="mt-3 text-right text-sm text-paper/70 md:mt-4 md:pr-2">
        Site by{" "}
        <a
          href="https://anujmishra.dev"
          target="_blank"
          rel="noopener"
          className="underline underline-offset-4 hover:text-sun"
        >
          Anuj Mishra<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
