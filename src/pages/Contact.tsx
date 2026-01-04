import { useState, useEffect, FormEvent } from "react";
import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    document.title = "Senior Buddies - Contact";
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams();

    // Convert FormData to URLSearchParams
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (response.ok || response.status === 200) {
        setStatus("success");
        form.reset();
        // Reset status after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Form submission failed:", response.status, response.statusText);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              We'd love to hear from you. Reach out with questions, ideas, or just to say hello!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <div className="bg-card rounded-2xl p-8 shadow-card">
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Send Us a Message</h2>
                  
                  {status === "success" && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-green-800 dark:text-green-200 font-body">
                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-800 dark:text-red-200 font-body">
                        There was an error sending your message. Please try again or contact us directly.
                      </p>
                    </div>
                  )}
                  
                  <form 
                    name="contact" 
                    method="POST" 
                    action="/"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>
                        Don't fill this out if you're human: <input name="bot-field" />
                      </label>
                    </p>

                    <div>
                      <label htmlFor="name" className="block font-body font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-body font-medium text-foreground mb-2">
                        Email Address
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
                      <label htmlFor="message" className="block font-body font-medium text-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-soft hover:shadow-card font-body disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
