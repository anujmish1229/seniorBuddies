import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

// Color palette for event cards
const eventColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];

const Events = () => {
  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Senior Buddies - Events";
    
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/.netlify/functions/eventbrite-events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Map Eventbrite events to our format
        const formattedEvents: FormattedEvent[] = data.events?.map((event: EventbriteEvent, index: number) => {
          const startDate = new Date(event.start.utc);
          const endDate = new Date(event.end.utc);
          
          // Format date (e.g., "January 15, 2024")
          const dateStr = startDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          // Format time (e.g., "2:00 PM - 4:00 PM")
          const startTime = startDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          const endTime = endDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          const timeStr = `${startTime} - ${endTime}`;
          
          // Format location
          let location = 'Location TBD';
          if (event.venue) {
            const parts = [];
            if (event.venue.name) parts.push(event.venue.name);
            if (event.venue.address) {
              if (event.venue.address.address_1) parts.push(event.venue.address.address_1);
              if (event.venue.address.city) parts.push(event.venue.address.city);
              if (event.venue.address.region) parts.push(event.venue.address.region);
            }
            location = parts.length > 0 ? parts.join(', ') : location;
          }
          
          // Get description (strip HTML tags for plain text)
          const description = event.description?.text || event.description?.html?.replace(/<[^>]*>/g, '') || 'No description available.';
          const truncatedDescription = description.length > 200 
            ? description.substring(0, 200) + '...' 
            : description;
          
          // Calculate available spots
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
        }) || [];
        
        setEvents(formattedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err instanceof Error ? err.message : 'Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-6">
              Upcoming Events
            </h1>
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
            {loading ? (
              <div className="bg-card rounded-2xl p-12 shadow-card text-center animate-fade-in-up">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50 animate-pulse" />
                <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                  Loading Events...
                </h2>
              </div>
            ) : error ? (
              <div className="bg-card rounded-2xl p-12 shadow-card text-center animate-fade-in-up">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                  Unable to Load Events
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed mb-6">
                  {error}. Please try again later or{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    contact us
                  </Link>
                  {" "}if the problem persists.
                </p>
              </div>
            ) : events.length === 0 ? (
              <div className="bg-card rounded-2xl p-12 shadow-card text-center animate-fade-in-up">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                  No Events Scheduled
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed mb-6">
                  Sorry, there are no events scheduled right now. Check back later or{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    contact us
                  </Link>
                  {" "}if you think this is a mistake.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div 
                        className="w-full md:w-2 md:min-h-full"
                        style={{ backgroundColor: event.color }}
                      />
                      
                      <div className="flex-1 p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="space-y-3">
                            <h3 className="font-heading font-bold text-xl text-foreground">
                              {event.title}
                            </h3>
                            
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
                            
                            <p className="text-muted-foreground font-body leading-relaxed">
                              {event.description}
                            </p>
                            
                            {event.spots > 0 && (
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-primary" />
                                <span className="text-primary font-medium font-body">{event.spots} spots available</span>
                              </div>
                            )}
                          </div>
                          
                          <Button asChild variant="hero" className="shrink-0">
                            <a href={event.url} target="_blank" rel="noopener noreferrer">
                              Register
                              <ArrowRight className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Host Event CTA */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Want to Host an Event?</h2>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Have a great idea for bringing generations together? We'd love to hear from you and help make it happen.
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
