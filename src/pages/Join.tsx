import { useState } from "react";
import Layout from "@/components/Layout";
import { Heart, Users, Calendar, CheckCircle } from "lucide-react"

const Join = () => {
  const [isVolunteer, setIsVolunteer] = useState(true);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-6">
              Join Our Community
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Become part of something meaningful. Whether you're looking for companionship or want to volunteer, there's a place for you here.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits + Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Form Side */}
            <div className="animate-slide-in-right">
              <div className="bg-card rounded-2xl p-8 shadow-card">
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                    {isVolunteer ? "Get Started" : "Express Your Interest"}
                  </h2>
                  <p className="text-muted-foreground font-body mb-8">
                    {isVolunteer 
                      ? "Fill out this form and we'll be in touch to discuss how you can get involved."
                      : "Fill out this form to express your interest in being matched with a volunteer. We'll be in touch soon!"
                    }
                  </p>
                  
                  {/* Toggle Switch */}
                  <div className="mb-8">
                    <label className="block font-body font-medium text-foreground mb-3 text-center">
                      I am a:
                    </label>
                    <div className="flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => setIsVolunteer(false)}
                        className={`px-6 py-3 rounded-lg font-body font-semibold transition-all ${
                          !isVolunteer
                            ? "bg-primary text-primary-foreground shadow-soft"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        Senior
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsVolunteer(true)}
                        className={`px-6 py-3 rounded-lg font-body font-semibold transition-all ${
                          isVolunteer
                            ? "bg-primary text-primary-foreground shadow-soft"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        Volunteer
                      </button>
                    </div>
                  </div>
                  
                  <form 
                    name={isVolunteer ? "join-volunteer" : "senior-interest"} 
                    method="POST" 
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value={isVolunteer ? "join-volunteer" : "senior-interest"} />
                    <input type="hidden" name="type" value={isVolunteer ? "volunteer" : "senior"} />
                    <p className="hidden">
                      <label>
                        Don't fill this out if you're human: <input name="bot-field" />
                      </label>
                    </p>

                    <div>
                      <label htmlFor="name" className="block font-body font-medium text-foreground mb-2">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-body font-medium text-foreground mb-2">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block font-body font-medium text-foreground mb-2">
                        Phone Number <span className="text-accent">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="(905) 555-1234"
                      />
                    </div>

                    {isVolunteer ? (
                      <div>
                        <label htmlFor="message" className="block font-body font-medium text-foreground mb-2">
                          Tell Us About Yourself <span className="text-accent">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                          placeholder="What interests or hobbies do you have? Why are you interested in volunteering with Senior Buddies? What skills or experiences can you bring?"
                        />
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="message" className="block font-body font-medium text-foreground mb-2">
                          Additional Information <span className="text-muted-foreground text-sm font-normal">(Optional)</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                          placeholder="Tell us about your interests, hobbies, or anything else you'd like us to know (optional)"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-soft hover:shadow-card font-body flex items-center justify-center gap-2"
                    >
                      <Heart className="h-5 w-5" />
                      {isVolunteer ? "Submit Volunteer Application" : "Submit Interest Form"}
                    </button>

                    <p className="text-xs text-muted-foreground font-body text-center">
                      By submitting this form, you agree to be contacted by Senior Buddies regarding {isVolunteer ? "volunteer opportunities" : "programs and services"}.
                    </p>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Join;
