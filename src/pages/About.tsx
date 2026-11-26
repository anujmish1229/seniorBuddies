import Layout from "@/components/Layout";
import { photos } from "@/data/photos";

const principles = [
  {
    term: "Mission",
    text: "To build meaningful intergenerational connections between youth and seniors in order to reduce loneliness, strengthen community belonging, and create positive shared experiences that benefit both generations.",
  },
  {
    term: "Vision",
    text: "We envision a community where seniors feel valued, youth feel empowered, and intergenerational friendship becomes a natural part of everyday life.",
  },
  {
    term: "Values",
    text: "Compassion, respect, inclusivity, and community. We believe every person has something valuable to share and deserves meaningful connection.",
  },
];

const activities = [
  {
    title: "Organize events",
    description: "Intergenerational events and activities for seniors and youth.",
  },
  {
    title: "Create safe and welcoming spaces",
    description: "Social spaces that reduce isolation.",
  },
  {
    title: "Provide leadership opportunities",
    description: "Leadership opportunities for youth volunteers.",
  },
  {
    title: "Encourage mutual learning",
    description: "Mutual learning, respect, and cultural sharing across generations.",
  },
];

const About = () => (
  <Layout title="About">
    {/* Title and story share one left edge; the photo runs off the right side of the page. */}
    <section className="grid lg:grid-cols-2">
      <div className="px-5 pt-14 pb-16 md:px-10 md:pt-20 md:pb-24 lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-82rem)/2+2.5rem))]">
        <h1 className="text-[clamp(3rem,7vw,6rem)]">About Senior Buddies</h1>
        <p className="mt-6 text-xl text-ink-soft md:text-2xl md:leading-snug">
          Building meaningful connections between generations in Durham Region since 2022.
        </p>
        <h2 className="mt-14 border-t-2 border-ink pt-6 text-4xl md:text-5xl">Our story</h2>
        <div className="mt-6 space-y-6 text-lg leading-relaxed md:text-xl">
          <p>
            Senior Buddies began with a simple observation. Many seniors in our community were feeling isolated, while
            many youth were searching for purpose, connection, and belonging. Loneliness is not only a senior issue.
            Young people today also face social isolation, stress, and disconnection from the community. Senior Buddies
            was created to bring these two generations together through meaningful intergenerational relationships.
          </p>
          <p>
            Through shared experiences, conversation, and community involvement, we help seniors feel valued and
            supported, while helping youth grow as compassionate leaders. What started as a small student project has
            now grown into a youth-led nonprofit that connects hearts, builds friendships, and reminds everyone that
            community care goes both ways.
          </p>
        </div>
      </div>
      {/* The photo runs from the nav down to the next section, with no gap either side. */}
      <div className="relative aspect-[4/3] lg:aspect-auto">
        <img
          src={photos.volunteersTrip.src}
          alt={photos.volunteersTrip.alt}
          width={photos.volunteersTrip.width}
          height={photos.volunteersTrip.height}
          className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
        />
      </div>
    </section>

    {/* Mission, vision, values */}
    <section className="on-dark bg-ink text-paper">
      <div className="container py-20 md:py-28">
        <h2 className="max-w-3xl text-5xl md:text-6xl">What we stand for</h2>
        <dl className="mt-12">
          {principles.map((p) => (
            <div key={p.term} className="grid gap-3 border-t border-paper/25 py-8 md:grid-cols-12 md:gap-10">
              <dt className="font-display text-3xl font-semibold text-sun md:col-span-4 md:text-4xl">{p.term}</dt>
              <dd className="max-w-3xl text-xl text-paper/90 md:col-span-8">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* What we do */}
    <section className="bg-shirt">
      <div className="container py-20 md:py-28">
        <h2 className="text-5xl md:text-6xl">What we do</h2>
        <ol className="mt-12 grid gap-x-12 md:grid-cols-2">
          {activities.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t-2 border-ink py-7">
              <span className="font-display text-3xl font-semibold" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-3xl">{item.title}</h3>
                <p className="mt-2">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </Layout>
);

export default About;
