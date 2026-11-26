import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

// A bunch of balloons tied to a little weight. Click them and the weight drops,
// the balloons drift apart and float up while the page scrolls back to the top.
// Colours are the letter colours of the Senior Buddies wordmark.
const balloons = [
  { colour: "#ffd0d0", angle: -26, length: 96, duration: 3.4, delay: -1.2 },
  { colour: "#fddc7c", angle: -13, length: 124, duration: 4.1, delay: -0.4 },
  { colour: "#b9e6e6", angle: 0, length: 140, duration: 3.7, delay: -2.1 },
  { colour: "#cfd0fb", angle: 13, length: 120, duration: 4.4, delay: -1.6 },
  { colour: "#dcf5cf", angle: 26, length: 94, duration: 3.2, delay: -0.9 },
];

const FLIGHT_MS = 1700;
const WIDTH = 240;
const HEIGHT = 250;
const KNOT_FROM_BOTTOM = 46;

type Phase = "idle" | "released" | "flying";

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const Balloon = ({ colour }: { colour: string }) => (
  <svg viewBox="0 0 60 78" width="60" height="78" aria-hidden className="overflow-visible">
    {/* Offset black shadow, like the wordmark letters. */}
    <ellipse cx="33" cy="33" rx="26" ry="31" fill="#000" />
    <ellipse cx="30" cy="30" rx="26" ry="31" fill={colour} />
    <ellipse cx="21" cy="19" rx="6" ry="9" fill="#fff" opacity="0.55" transform="rotate(-20 21 19)" />
    <path d="M26 60 L34 60 L30 66 Z" fill={colour} stroke="#000" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const BalloonsToTop = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [rect, setRect] = useState<{ top: number; left: number; scale: number } | null>(null);
  const ref = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  const focusTop = () => document.getElementById("main")?.focus({ preventScroll: true });

  const launch = () => {
    if (phase !== "idle") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      focusTop();
      return;
    }

    const box = ref.current!.getBoundingClientRect();
    setRect({ top: box.top, left: box.left, scale: box.width / WIDTH });
    setPhase("released");

    // Scroll to the top with the balloons, starting once they've let go of the weight.
    timers.current.push(
      window.setTimeout(() => {
        setPhase("flying");
        const startY = window.scrollY;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / FLIGHT_MS);
          window.scrollTo(0, startY * (1 - easeInOut(t)));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, 350),
    );

    // Put everything back in the footer, ready for next time.
    timers.current.push(
      window.setTimeout(() => {
        setPhase("idle");
        setRect(null);
        focusTop();
      }, 350 + FLIGHT_MS + 150),
    );
  };

  const released = phase !== "idle";
  const flying = phase === "flying";

  // While released, the bunch moves to <body> and is pinned to the screen, so it can rise past the
  // scrolling page whatever transforms the footer uses. It keeps the size it had in the footer.
  const groupStyle: CSSProperties = rect
    ? {
        position: "fixed",
        top: rect.top,
        left: rect.left,
        zIndex: 50,
        transformOrigin: "top left",
        transform: `translateY(${flying ? -(rect.top + HEIGHT * rect.scale + 120) : -12}px) scale(${rect.scale})`,
        transition: `transform ${flying ? FLIGHT_MS : 350}ms cubic-bezier(0.5, 0, 0.6, 1)`,
        pointerEvents: "none",
      }
    : {};

  const bunch = (
    <span
      className="absolute inset-0 block"
      style={{
        ...groupStyle,
        width: WIDTH,
        height: HEIGHT,
        animation: released ? undefined : "balloon-bob 2.6s ease-in-out infinite alternate",
      }}
    >
      {balloons.map((b) => {
        // Once released, each balloon turns upright and moves apart sideways, string hanging straight down.
        const spread = released ? 0 : b.angle;
        const armStyle = {
          "--a": `${spread}deg`,
          left: WIDTH / 2,
          bottom: KNOT_FROM_BOTTOM,
          height: b.length + 78,
          transformOrigin: "bottom center",
          rotate: `${spread}deg`,
          animation: released ? undefined : `balloon-sway ${b.duration}s ease-in-out ${b.delay}s infinite alternate`,
          transition: "rotate 500ms ease-out, translate 500ms ease-out",
          translate: released ? `${b.angle * 4.5}px -24px` : "0 0",
        } as CSSProperties;
        return (
          <span key={b.colour} className="absolute block w-0" style={armStyle}>
            <span className="absolute top-0 left-0 -translate-x-1/2 transition-transform group-hover:-translate-y-1">
              <Balloon colour={b.colour} />
            </span>
            {/* String: tied to the weight until released, then it hangs loose under its balloon. */}
            <span
              className="absolute left-0 w-0.5 -translate-x-1/2 bg-paper/70"
              style={{ top: 70, height: released ? b.length * 0.45 : b.length + 8, transition: "height 400ms ease-out" }}
            />
          </span>
        );
      })}
    </span>
  );

  return (
    // Drawn at full size and scaled down on narrow screens; the outer box reserves the scaled size.
    <div className="h-[163px] w-[156px] sm:h-[250px] sm:w-[240px]">
      <div className="origin-top-left scale-[0.65] sm:scale-100">
      <button
        ref={ref}
        type="button"
        onClick={launch}
        disabled={released}
        aria-label="Back to top"
        className="group relative block cursor-pointer rounded-lg text-left disabled:cursor-default"
        style={{ width: WIDTH, height: HEIGHT }}
      >
        {rect ? createPortal(bunch, document.body) : bunch}

        {/* The weight. It stays behind (and drops) when the balloons let go. */}
        <span
          className="absolute block"
          style={{
            left: WIDTH / 2 - 14,
            bottom: KNOT_FROM_BOTTOM - 26,
            transform: released ? "translateY(40px)" : "none",
            opacity: released ? 0 : 1,
            transition: "transform 450ms cubic-bezier(0.5, 0, 1, 1), opacity 450ms ease-in",
          }}
          aria-hidden
        >
          <svg viewBox="0 0 28 28" width="28" height="28">
            <circle cx="14" cy="4" r="3.5" fill="none" stroke="#fbf7ef" strokeWidth="2.5" />
            <path d="M5 9 H23 L26 26 H2 Z" fill="#fbf7ef" />
          </svg>
        </span>
      </button>
      </div>
    </div>
  );
};

export default BalloonsToTop;
