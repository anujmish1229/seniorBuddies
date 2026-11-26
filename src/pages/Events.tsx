import { useState } from "react";
import { Link } from "react-router";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Segmented from "@/components/Segmented";
import { Button } from "@/components/ui/button";
import { events, type SiteEvent } from "@/data/events";
import { instagramUrl, pages } from "@/data/site";

const linkClass = "font-bold text-link underline decoration-2 underline-offset-4 hover:text-ink";

// Dates are calendar days, so parse them as local dates, not UTC midnight.
const parseDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
const upcoming = sorted.filter((e) => parseDay(e.date) >= today).reverse();
const past = sorted.filter((e) => parseDay(e.date) < today);

const EventItem = ({ event }: { event: SiteEvent }) => {
  const day = parseDay(event.date);
  const fmt = (o: Intl.DateTimeFormatOptions) => day.toLocaleDateString("en-CA", o);
  const fullDate = fmt({ weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <li className="grid gap-4 border-t border-rule py-10 md:grid-cols-[9rem_1fr] md:gap-10 lg:grid-cols-[9rem_1fr_auto]">
      <p className="flex items-baseline gap-3 font-display leading-none md:block" aria-hidden>
        <span className="block text-2xl font-semibold">{fmt({ month: "short" })}</span>
        <span className="block text-5xl font-bold md:text-7xl">{fmt({ day: "numeric" })}</span>
      </p>
      <div>
        <h3 className="text-3xl md:text-4xl">{event.title}</h3>
        <p className="mt-3 font-bold">
          {event.postedOnly ? `Posted ${fmt({ month: "long", day: "numeric", year: "numeric" })}` : fullDate}
          {event.time && <span className="font-normal text-ink-soft">, {event.time}</span>}
        </p>
        <p className="text-ink-soft">{event.place}</p>
        <p className="mt-4 max-w-2xl">{event.summary}</p>
      </div>
      <div className="flex flex-wrap items-start gap-x-6 gap-y-3 lg:flex-col lg:items-end lg:pt-2">
        {event.register && (
          <Button asChild>
            <a href={event.register} target="_blank" rel="noopener noreferrer">
              Register<span className="sr-only"> for {event.title} (opens in a new tab)</span>
            </a>
          </Button>
        )}
        <a href={event.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
          See the post<span className="sr-only"> about {event.title} on Instagram (opens in a new tab)</span>
        </a>
      </div>
    </li>
  );
};

const ranges = [
  { value: "upcoming", label: "Coming up" },
  { value: "past", label: "Past" },
] as const;

type Range = (typeof ranges)[number]["value"];

const Events = () => {
  const [range, setRange] = useState<Range>("upcoming");
  const list = range === "upcoming" ? upcoming : past;

  return (
  <Layout title="Events">
    <PageHeader title="Events" tone="sun">
      <p>Join us for activities that bring generations together in Durham Region.</p>
    </PageHeader>

    <section aria-labelledby="events-heading" className="container pt-14 pb-20 md:pt-16 md:pb-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="events-heading" className="text-4xl md:text-5xl">
          {range === "upcoming" ? "Coming up" : "Past events"}
        </h2>
        <Segmented<Range>
          name="range"
          legend="Show"
          legendClassName="sr-only"
          options={ranges}
          value={range}
          onChange={setRange}
        />
      </div>

      <div aria-live="polite">
        {list.length > 0 ? (
          <ol className="mt-8">
            {list.map((e) => (
              <EventItem key={e.title + e.date} event={e} />
            ))}
          </ol>
        ) : (
          <p className="mt-8 max-w-2xl border-t border-rule pt-8 text-xl text-ink-soft">
            {range === "upcoming" ? (
              <>
                Nothing is scheduled right now. New events are announced on{" "}
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  our Instagram<span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                first.
              </>
            ) : (
              "No past events yet."
            )}
          </p>
        )}
      </div>
    </section>

    <section className="bg-shirt">
      <div className="container grid gap-8 py-16 md:py-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 className="text-5xl md:text-6xl">Want to host an event?</h2>
          <p className="mt-5 max-w-2xl text-xl">
            Have an idea for bringing generations together? We'd love to hear from you and help make it happen.
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Button asChild>
            <Link to={pages.contact.path}>Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default Events;
