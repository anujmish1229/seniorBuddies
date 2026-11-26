import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { inputClass, labelClass, statusClass } from "@/components/form-styles";
import { useNetlifyForm } from "@/hooks/use-netlify-form";
import { social } from "@/data/site";

const linkClass = "font-bold text-link underline decoration-2 underline-offset-4 hover:text-ink";

const Contact = () => {
  const { status, handleSubmit } = useNetlifyForm();

  return (
    <Layout title="Contact">
      <PageHeader title="Contact" tone="blush">
        <p>We'd love to hear from you. Reach out with questions, ideas, or just to say hello.</p>
      </PageHeader>

      <div className="container grid gap-12 pt-14 pb-20 md:pt-20 md:pb-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div aria-live="polite">
            {status === "success" && (
              <p className={statusClass.success}>
                Thank you. Your message has been sent, and we'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className={statusClass.error}>Your message didn't send. Please try again, or message us on Instagram.</p>
            )}
          </div>

          <form
            name="contact"
            method="POST"
            action="/"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            aria-label="Send us a message"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>
              <input type="text" id="name" name="name" required autoComplete="name" className={inputClass} />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input type="email" id="email" name="email" required autoComplete="email" className={inputClass} />
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea id="message" name="message" required rows={6} className={inputClass} />
            </div>

            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="border-t-2 border-ink pt-5 text-3xl">Or message us</h2>
          <ul className="mt-4 space-y-2 text-xl">
            {social.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {s.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Layout>
  );
};

export default Contact;
