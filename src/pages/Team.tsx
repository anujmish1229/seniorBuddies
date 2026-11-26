import { Link } from "react-router";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import PhotoStrip from "@/components/PhotoStrip";
import { Button } from "@/components/ui/button";
import { volunteerPhotos } from "@/data/photos";
import { pages } from "@/data/site";
import tanishkaImage from "@/assets/tanishka.webp";
import anujImage from "@/assets/anuj.webp";
import harshImage from "@/assets/harsh.webp";
import teamMembersData from "@/data/team-members.json";

// Board member photos are bundled assets, so they're mapped in here by the "image" key from the JSON.
const boardMemberImages: Record<string, string> = {
  tanishka: tanishkaImage,
  anuj: anujImage,
  harsh: harshImage,
};

const teamMembers = teamMembersData.map((member) => ({
  ...member,
  image: boardMemberImages[member.image],
  firstName: member.name.split(" ")[0],
  lastName: member.name.split(" ").slice(1).join(" "),
}));

const discColours = ["bg-sun", "bg-shirt", "bg-blush"];
const highlightColours = ["bg-sun/60", "bg-shirt/60", "bg-blush"];

const linkClass = "font-bold text-link underline decoration-2 underline-offset-4 hover:text-ink";

const Team = () => (
  <Layout title="Our team">
    <PageHeader title="Our team" tone="blush">
      <p>The board and youth volunteers working to bring generations together in Durham Region.</p>
    </PageHeader>

    {/* Board */}
    <section aria-labelledby="board" className="container py-20 md:py-28">
      <h2 id="board" className="text-center text-5xl md:text-6xl">
        Board
      </h2>
      <ul className="mt-14 grid gap-16 md:grid-cols-3 md:gap-10 lg:gap-14">
        {teamMembers.map((member, i) => (
          <li key={member.name} className="flex flex-col items-center text-center">
            {/* A flat disc in one of the logo colours sits behind each portrait. It's translated, so it doesn't affect centring. */}
            <div className="relative mb-8 size-56 md:size-48 lg:size-60">
              <span className={`absolute inset-0 translate-x-4 translate-y-4 rounded-full ${discColours[i % discColours.length]}`} aria-hidden />
              <img
                src={member.image}
                alt={`Portrait of ${member.name}`}
                width={400}
                height={400}
                loading="lazy"
                className="relative size-full rounded-full border-4 border-paper object-cover"
              />
            </div>
            {/* First and last name on their own lines, so every name takes two lines at every width. */}
            <h3 className="text-4xl lg:text-5xl">
              <span className="block">{member.firstName}</span>
              <span className="block">{member.lastName}</span>
            </h3>
            <p className="mt-2 text-lg font-bold">
              <span className={`box-decoration-clone px-1 ${highlightColours[i % highlightColours.length]}`}>{member.role}</span>
            </p>
            <p className="mt-5 max-w-sm text-ink-soft">{member.bio}</p>
            <p className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href={`mailto:${member.email}`} className={linkClass}>
                Email {member.firstName}
              </a>
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  LinkedIn<span className="sr-only"> profile for {member.name} (opens in a new tab)</span>
                </a>
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>

    {/* Youth volunteers */}
    <section aria-labelledby="volunteers" className="on-dark bg-ink pt-20 pb-16 text-paper md:pt-28 md:pb-20">
      <div className="container">
        <h2 id="volunteers" className="text-5xl md:text-6xl">
          Our youth volunteers
        </h2>
        <p className="mt-5 max-w-2xl text-xl text-paper/85">
          Some of the young people who volunteer with Senior Buddies.
        </p>
      </div>
      <div className="mt-10">
        <PhotoStrip photos={volunteerPhotos} label="Photos of youth volunteers" />
      </div>
    </section>

    {/* Volunteer call */}
    <section className="bg-shirt">
      <div className="container grid gap-8 py-16 md:py-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 className="text-5xl md:text-6xl">Want to volunteer?</h2>
          <p className="mt-5 max-w-2xl text-xl">
            Fill out the volunteer form and we'll be in touch to discuss how you can get involved.
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

export default Team;
