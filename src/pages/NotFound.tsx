import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { pages } from "@/data/site";

const NotFound = () => (
  <Layout title="Page not found">
    <section className="container grid gap-8 py-20 md:py-32 lg:grid-cols-12">
      <p className="font-display text-8xl font-bold text-ink-soft md:text-9xl lg:col-span-4" aria-hidden>
        404
      </p>
      <div className="lg:col-span-7 lg:col-start-6">
        <h1 className="text-5xl md:text-7xl">We can't find that page</h1>
        <p className="mt-6 max-w-xl text-xl text-ink-soft">
          The link may be out of date, or the address may have a typo. If you were looking for something specific,{" "}
          <Link to={pages.contact.path} className="font-bold text-link underline decoration-2 underline-offset-4 hover:text-ink">
            contact us
          </Link>
          .
        </p>
        <Button asChild className="mt-10">
          <Link to={pages.home.path}>Go to the home page</Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default NotFound;
