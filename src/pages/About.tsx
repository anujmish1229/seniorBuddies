import Layout from "@/components/Layout";
import { Heart, Target, Eye, CheckCircle } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-6">
              About Senior Buddies
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Building meaningful connections between generations in Durham Region since 2022.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="font-heading font-bold text-3xl text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                Senior Buddies began with a simple observation. Many seniors in our community were feeling isolated, while many youth were searching for purpose, connection, and belonging. Loneliness is not only a senior issue. Young people today also face social isolation, stress, and disconnection from the community. Senior Buddies was created to bring these two generations together through meaningful intergenerational relationships.
                </p>
                <p>
                Through shared experiences, conversation, and community involvement, we help seniors feel valued and supported, while empowering youth to grow as compassionate leaders. What started as a small student project has now grown into a youth-led nonprofit that connects hearts, builds friendships, and reminds everyone that community care goes both ways.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-card animate-fade-in-up">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                To build meaningful intergenerational connections between youth and seniors in order to reduce loneliness, strengthen community belonging, and create positive shared experiences that benefit both generations. 
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
              We envision a community where seniors feel valued, youth feel empowered, and intergenerational friendship becomes a natural part of everyday life.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">Our Values</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Compassion, respect, inclusivity, and community. We believe every person has something valuable to share and deserves meaningful connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">What We Do</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Organize Events",
                  description: "Organize intergenerational events and activities for seniors and youth",
                },
                {
                  title: "Create Safe and Welcoming Spaces",
                  description: "Create safe and welcoming social spaces that reduce isolation.",
                },
                {
                  title: "Provide Leadership Opportunities",
                  description: "Provide leadership opportunities for youth volunteers and encourage mutual learning, respect, and cultural sharing across generations",
                },
                {
                  title: "Encourage Mutual Learning",
                  description: "Encourage mutual learning, respect, and cultural sharing across generations",
                },
              ].map((item, index) => (
                <div 
                  key={item.title}
                  className="flex gap-4 p-6 bg-card rounded-xl shadow-soft animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground font-body">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
