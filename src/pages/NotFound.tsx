import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  useEffect(() => {
    document.title = "Senior Buddies - Not Found";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative text-center px-4">
        <div className="font-heading font-extrabold text-8xl md:text-9xl text-primary/20 mb-4">
          404
        </div>
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground font-body text-lg mb-8 max-w-md mx-auto">
          Oops! It looks like this page has wandered off. Let's get you back to our community.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/">
              <Home className="h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="heroOutline" size="lg">
            <Link to="/contact">
              <ArrowLeft className="h-5 w-5" />
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
