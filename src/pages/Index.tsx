import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { photos } from "@/data/photos";
import { pages } from "@/data/site";
import heroImage from "@/assets/hero-image.webp";

const aims = [
  {
    title: "Reducing loneliness for seniors and youth",
    description:
      "We create welcoming environments where seniors feel connected and supported, and youth feel included and purposeful.",
  },
  {
    title: "Building leadership and empathy in youth",
    description:
      "Youth volunteers learn to communicate, serve, and lead with compassion while gaining real-world experience.",
  },
  {
    title: "Strengthening intergenerational community bonds",
    description:
      "We bridge the gap between generations so that seniors and youth learn from one another, creating community belonging that benefits everyone.",
  },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="container grid gap-6 pt-12 md:pt-16 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="pb-4 lg:col-span-7 lg:pb-16">
        <h1 className="text-[clamp(2.375rem,9vw,4.5rem)] leading-[0.95] lg:text-[min(6.3vw,5.75rem)]">
          Bridging the{" "}
          <span className="underline decoration-sun decoration-[0.14em] underline-offset-[0.12em] [text-decoration-skip-ink:none]">
            intergenerational
          </span>{" "}
          gap
        </h1>
        <p className="mt-8 max-w-xl text-xl text-ink-soft md:text-2xl md:leading-snug">
          A youth-led group in Durham Region, Ontario, bringing youth volunteers and seniors together, because loneliness
          isn't only a senior issue.
        </p>
        <Button asChild className="mt-10">
          <Link to={pages.join.path}>Join Senior Buddies</Link>
        </Button>
      </div>

      {/* The cutout photo with a flat shirt-blue echo behind it. */}
      <div className="lg:col-span-5">
        <img
          src={heroImage}
          alt="Tanishka Sharma, in a Senior Buddies T-shirt and a Santa hat, stands smiling next to Cecil Uncle, who is laughing."
          width={1012}
          height={855}
          className="mx-auto h-auto w-[calc(100%-22px)] max-w-lg [filter:drop-shadow(22px_0_0_var(--color-shirt))] lg:-ml-16 lg:w-[calc(100%+4rem)] lg:max-w-none"
        />
      </div>
    </section>

    {/* What we work towards */}
    <section className="on-dark bg-ink text-paper">
      <div className="container grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <h2 className="text-5xl md:text-6xl lg:col-span-4">How we make a difference</h2>
        <ol className="lg:col-span-7 lg:col-start-6">
          {aims.map((aim, i) => (
            <li
              key={aim.title}
              className="grid gap-3 border-t border-paper/25 py-8 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr]"
            >
              <span className="font-display text-4xl font-semibold text-sun" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-3xl md:text-4xl">{aim.title}</h3>
                <p className="mt-3 max-w-2xl text-paper/85">{aim.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Photo bleeds to the left edge; text sits on the page grid. */}
    <section className="grid lg:grid-cols-2 lg:items-center">
      <img
        src={photos.busTrip.src}
        alt={photos.busTrip.alt}
        width={photos.busTrip.width}
        height={photos.busTrip.height}
        loading="lazy"
        className="h-full max-h-[36rem] w-full object-cover"
      />
      <div className="px-5 py-16 md:px-10 lg:py-24 lg:pr-[max(2.5rem,calc((100vw-82rem)/2+2.5rem))] lg:pl-16">
        <p className="font-display text-4xl leading-tight font-semibold md:text-5xl">
          Loneliness is not only a senior issue.
        </p>
        <p className="mt-6 max-w-lg text-ink-soft">
          Young people also face social isolation, stress, and disconnection from the community. Senior Buddies brings the
          two generations together.
        </p>
        <Link
          to={pages.about.path}
          className="mt-8 inline-block font-bold text-link underline decoration-2 underline-offset-4 hover:text-ink"
        >
          Read our story on the About page
        </Link>
      </div>
    </section>

    {/* Call to volunteer */}
    <section className="bg-sun">
      <div className="container grid gap-8 py-16 md:py-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 className="text-5xl md:text-7xl">Volunteer with us</h2>
          <p className="mt-5 max-w-2xl text-xl">
            If you're a youth wanting to give back, we'd love to have you join our community.
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Button asChild>
            <Link to={pages.join.path}>Join Senior Buddies</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
