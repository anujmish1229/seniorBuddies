import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Segmented from "@/components/Segmented";
import { Button } from "@/components/ui/button";
import { inputClass, labelClass, statusClass } from "@/components/form-styles";
import { useNetlifyForm } from "@/hooks/use-netlify-form";

const choices = [
  { value: "senior", label: "A senior" },
  { value: "volunteer", label: "A youth volunteer" },
] as const;

const Join = () => {
  const [isVolunteer, setIsVolunteer] = useState(true);
  const { status, setStatus, handleSubmit } = useNetlifyForm();
  const formName = isVolunteer ? "join-volunteer" : "senior-interest";

  return (
    <Layout title="Join">
      <PageHeader title="Join Senior Buddies" tone="shirt" centered>
        <p>Whether you're looking for companionship or want to volunteer, there's a place for you here.</p>
      </PageHeader>

      <div className="container pt-14 pb-20 md:pt-20 md:pb-28">
        <section aria-labelledby="form-heading" className="mx-auto max-w-2xl">
          <Segmented
            name="role"
            legend="I am"
            options={choices}
            value={isVolunteer ? "volunteer" : "senior"}
            onChange={(v) => {
              setIsVolunteer(v === "volunteer");
              setStatus("idle");
            }}
            legendClassName="w-full text-center"
            className="mb-12 text-center"
          />

          <h2 id="form-heading" className="text-center text-4xl">
            {isVolunteer ? "Volunteer application" : "Seniors' interest form"}
          </h2>
          <p className="mt-3 mb-8 text-center text-ink-soft">
            {isVolunteer
              ? "Fill out this form and we'll be in touch to discuss how you can get involved."
              : "Let us know you'd like to join our events, and we'll be in touch."}
          </p>

          <div aria-live="polite">
            {status === "success" && (
              <p className={statusClass.success}>
                Thank you. Your {isVolunteer ? "application" : "interest form"} has been submitted, and we'll be in
                touch soon.
              </p>
            )}
            {status === "error" && (
              <p className={statusClass.error}>
                Your form didn't send. Please try again, or contact us directly.
              </p>
            )}
          </div>

          <form
            name={formName}
            method="POST"
            action="/"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value={formName} />
            <input type="hidden" name="type" value={isVolunteer ? "volunteer" : "senior"} />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <p className="text-base text-ink-soft">
              Fields marked <span aria-hidden>*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>

            <div>
              <label htmlFor="name" className={labelClass}>
                Full name <span aria-hidden>*</span>
              </label>
              <input type="text" id="name" name="name" required autoComplete="name" className={inputClass} />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email address <span aria-hidden>*</span>
              </label>
              <input type="email" id="email" name="email" required autoComplete="email" className={inputClass} />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone number <span aria-hidden>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                autoComplete="tel"
                className={inputClass}
                placeholder="(905) 555-1234"
              />
            </div>

            {isVolunteer ? (
              <div>
                <label htmlFor="message" className={labelClass}>
                  Tell us about yourself <span aria-hidden>*</span>
                </label>
                <p id="message-hint" className="mb-2 text-base text-ink-soft">
                  What interests or hobbies do you have? Why are you interested in volunteering with Senior Buddies? What
                  skills or experiences can you bring?
                </p>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  aria-describedby="message-hint"
                  className={inputClass}
                />
              </div>
            ) : (
              <div>
                <label htmlFor="message" className={labelClass}>
                  Anything else you'd like us to know <span className="font-normal text-ink-soft">(optional)</span>
                </label>
                <p id="message-hint" className="mb-2 text-base text-ink-soft">
                  Your interests, hobbies, or anything else.
                </p>
                <textarea id="message" name="message" rows={6} aria-describedby="message-hint" className={inputClass} />
              </div>
            )}

            <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
              {status === "submitting"
                ? "Submitting…"
                : isVolunteer
                  ? "Submit volunteer application"
                  : "Submit interest form"}
            </Button>

            <p className="text-base text-ink-soft">
              By submitting this form, you agree to be contacted by Senior Buddies regarding{" "}
              {isVolunteer ? "volunteer opportunities" : "programs and services"}.
            </p>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Join;
