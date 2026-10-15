import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import eventsFallback from "@/data/events-fallback.json";

interface EventbriteEvent {
  id: string;
  name: {
    text: string;
  };
  description: {
    text: string;
    html?: string;
  };
  start: {
    utc: string;
    local: string;
    timezone: string;
  };
  end: {
    utc: string;
    local: string;
  };
  venue?: {
    name?: string;
    address?: {
      address_1?: string;
      city?: string;
      region?: string;
      postal_code?: string;
      country?: string;
    };
  };
  url: string;
  capacity?: number;
  tickets_available?: {
    total?: number;
  };
}

interface FormattedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  spots: number;
  color: string;
  url: string;
}

type EventRange = "upcoming" | "past";

// Color palette for event cards
const eventColors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#f0932b", "#eb4d4b", "#6c5ce7", "#a29bfe"];

function formatEvents(rawEvents: EventbriteEvent[]): FormattedEvent[] {
  return rawEvents.map((event, index) => {
    const startDate = new Date(event.start.utc);
    const endDate = new Date(event.end.utc);

    const dateStr = startDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const startTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const endTime = endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const timeStr = `${startTime} - ${endTime}`;

    let location = "Location TBD";
    if (event.venue) {
      const parts = [];
      if (event.venue.name) parts.push(event.venue.name);
      if (event.venue.address) {
        if (event.venue.address.address_1) parts.push(event.venue.address.address_1);
        if (event.venue.address.city) parts.push(event.venue.address.city);
        if (event.venue.address.region) parts.push(event.venue.address.region);
      }
      location = parts.length > 0 ? parts.join(", ") : location;
    }

    const description =
      event.description?.text || event.description?.html?.replace(/<[^>]*>/g, "") || "No description available.";
    const truncatedDescription = description.length > 200 ? description.substring(0, 200) + "..." : description;

    const capacity = event.capacity || event.tickets_available?.total || 0;

    return {
      id: event.id,
      title: event.name.text,
      date: dateStr,
      time: timeStr,
      location,
      description: truncatedDescription,
      spots: capacity,
      color: eventColors[index % eventColors.length],
      url: event.url,
    };
  });
}

const EMPTY_MESSAGES: Record<EventRange, { title: string; body: string }> = {
  upcoming: {
    title: "No Events Scheduled",
    body: "Sorry, there are no upcoming events scheduled right now. Check back later",
  },
  past: {
    title: "No Past Events",
    body: "We don't have any past events on record yet",
  },
};

const Events = () => {
  const [range, setRange] = useState<EventRange>("upcoming");
  const [eventsByRange, setEventsByRange] = useState<Record<EventRange, FormattedEvent[] | null>>({
    upcoming: null,
    past: null,
  });
  const [loadingRange, setLoadingRange] = useState<EventRange | null>("upcoming");
  const [errorByRange, setErrorByRange] = useState<Record<EventRange, string | null>>({
    upcoming: null,
    past: null,
  });
  const [usingFallback, setUsingFallback] = useState<Record<EventRange, boolean>>({
    upcoming: false,
    past: false,
  });

  useEffect(() => {
    document.title = "Senior Buddies - Events";
  }, []);

  useEffect(() => {
    // Fetch lazily, once per tab, and cache the result so switching tabs doesn't refetch.
    if (eventsByRange[range] !== null) return;

    let cancelled = false;

    const fetchEvents = async () => {
      setLoadingRange(range);
      setErrorByRange((prev) => ({ ...prev, [range]: null }));

      try {
        const response = await fetch(`/.netlify/functions/eventbrite-events?range=${range}`);

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        const formatted = formatEvents(data.events || []);
        if (!cancelled) {
          setEventsByRange((prev) => ({ ...prev, [range]: formatted }));
          setUsingFallback((prev) => ({ ...prev, [range]: false }));
        }
      } catch (err) {
        console.error(`Error fetching ${range} events, using fallback data:`, err);
        try {
          const fallback = formatEvents(eventsFallback[range] as EventbriteEvent[]);
          if (!cancelled) {
            setEventsByRange((prev) => ({ ...prev, [range]: fallback }));
            setUsingFallback((prev) => ({ ...prev, [range]: true }));
          }
        } catch (fallbackErr) {
          console.error(`Error loading fallback ${range} events:`, fallbackErr);
          if (!cancelled) {
            setErrorByRange((prev) => ({
              ...prev,
              [range]: err instanceof Error ? err.message : "Failed to load events",
            }));
          }
        }
      } finally {
        if (!cancelled) setLoadingRange(null);
      }
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, [range, eventsByRange]);

  const renderEventList = (tabRange: EventRange) => {
    const events = eventsByRange[tabRange];
    const error = errorByRange[tabRange];
    const isLoading = loadingRange === tabRange;

    if (isLoading || events === null) {
      return (
        <div className="bg-card rounded-2xl p-12 shadow-card text-center animate-fade-in-up">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50 animate-pulse" />
          <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Loading Events...</h2>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-card rounded-2xl p-12 shadow-card text-center animate-fade-in-up">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
          <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Unable to Load Events</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-6">
            {error}. Please try again later or{" "}
            <Link to="/contact" className="text-primary hover:underline font-medium">
              contact us
            </Link>{" "}
            if the problem persists.
          </p>
        </div>
      );
    }

    if (events.length === 0) {
      const { title, body } = EMPTY_MESSAGES[tabRange];
      return (
        <div className="bg-card rounded-2xl p-12 shadow-card text-center animate-fade-in-up">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
          <h2 className="font-heading font-bold text-2xl text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-6">
            {body} or{" "}
            <Link to="/contact" className="text-primary hover:underline font-medium">
              contact us
            </Link>{" "}
            if you think this is a mistake.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {usingFallback[tabRange] && (
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-sm text-muted-foreground font-body">
            We're having trouble loading live event data right now, so example events are shown below.{" "}
            <Link to="/contact" className="text-primary hover:underline font-medium">
              Contact us
            </Link>{" "}
            for the current schedule.
          </div>
        )}
        {events.map((event, index) => (
          <div
            key={event.id}
            className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2 md:min-h-full" style={{ backgroundColor: event.color }} />

              <div className="flex-1 p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3">
                    <h3 className="font-heading font-bold text-xl text-foreground">{event.title}</h3>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-body">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                    </div>

                    <p className="text-muted-foreground font-body leading-relaxed">{event.description}</p>

                    {tabRange === "upcoming" && event.spots > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-primary font-medium font-body">{event.spots} spots available</span>
                      </div>
                    )}
                  </div>

                  <Button asChild variant={tabRange === "upcoming" ? "hero" : "outline"} className="shrink-0">
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                      {tabRange === "upcoming" ? "Register" : "View Event"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-6">Events</h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Join us for activities that bring generations together in Durham Region.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs value={range} onValueChange={(value) => setRange(value as EventRange)}>
              <TabsList className="mb-8">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">{renderEventList("upcoming")}</TabsContent>
              <TabsContent value="past">{renderEventList("past")}</TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Host Event CTA */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Want to Host an Event?</h2>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Have a great idea for bringing generations together? We'd love to hear from you and help make it
              happen.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
