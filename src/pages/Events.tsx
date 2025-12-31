import Layout from "@/components/Layout";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const upcomingEvents = [
  {
    title: "Winter Warmth Social",
    date: "January 15, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Durham Community Centre",
    description: "Join us for hot cocoa, board games, and warm conversations as we kick off the new year together.",
    spots: 25,
    color: "#d0f4f4",
  },
  {
    title: "Tech Help Session",
    date: "January 22, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Oshawa Public Library",
    description: "Bring your devices and questions! Youth volunteers will help with smartphones, tablets, and video calling.",
    spots: 15,
    color: "#fff5ba",
  },
  {
    title: "Story Circle",
    date: "February 1, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Pickering Recreation Complex",
    description: "An afternoon of sharing life stories, memories, and experiences across generations.",
    spots: 20,
    color: "#f9defd",
  },
  {
    title: "Valentine's Craft Day",
    date: "February 12, 2025",
    time: "1:00 PM - 3:30 PM",
    location: "Whitby Seniors Centre",
    description: "Create handmade Valentine's cards and decorations together. All supplies provided!",
    spots: 30,
    color: "#ffd1d1",
  },
  {
    title: "Spring Garden Planning",
    date: "March 5, 2025",
    time: "11:00 AM - 1:00 PM",
    location: "Ajax Community Centre",
    description: "Share gardening wisdom and plan our community garden plots for the coming season.",
    spots: 18,
    color: "#dcf5cf",
  },
];

const Events = () => {
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
          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.title}
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
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-primary font-medium font-body">{event.spots} spots available</span>
                        </div>
                      </div>
                      
                      <Button asChild variant="hero" className="shrink-0">
                        <Link to="/join">
                          Register
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
