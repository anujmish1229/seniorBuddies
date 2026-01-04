import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-image.png";

const shadowColors = ['#ffd1d1', '#ffdd84', '#f9defd', '#dcf5cf', '#f5e1fa', '#d0f4f4', '#fff5ba'];

const Index = () => {
  const [shadowColor, setShadowColor] = useState(shadowColors[0]);

  useEffect(() => {
    document.title = "Senior Buddies - Bridging the Intergenerational Gap";
    const randomColor = shadowColors[Math.floor(Math.random() * shadowColors.length)];
    setShadowColor(randomColor);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="flex items-center gap-4">
                <img src={logo} alt="Senior Buddies Logo" className="h-64 w-auto" />
              </div>
              
              <div className="space-y-4">
                <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance">
                  Bridging the{" "}
                  <span className="text-primary">Intergenerational</span>{" "}
                  Gap
                </h1>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/join">
                    Join Our Community
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative animate-slide-in-right">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Cecil Uncle and Tanishka Sharma enjoying time together" 
                  className="w-full h-auto rounded-3xl"
                  style={{
                    filter: `drop-shadow(30px 0 0 ${shadowColor})`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-background to-transparent rounded-b-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              How We Make a Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Reducing loneliness for seniors and youth",
                description: "We create welcoming environments where seniors feel connected and supported, and youth feel included and purposeful.",
              },
              {
                title: "Building leadership and empathy in youth",
                description: "Youth volunteers learn to communicate, serve, and lead with compassion while gaining real-world experience.",
              },
              {
                title: "Strengthening intergenerational community bonds",
                description: "We bridge the gap between generations so that seniors and youth learn from one another, creating community belonging that benefits everyone.",
              },
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-4 border-primary-foreground rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-primary-foreground rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-primary-foreground/80 font-body text-lg mb-8 leading-relaxed">
              Whether you're a senior looking for companionship or a young person wanting to give back, we'd love to have you join our community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="xl" className="bg-card text-foreground hover:bg-card/90">
                <Link to="/join">
                  Join as a Volunteer
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
