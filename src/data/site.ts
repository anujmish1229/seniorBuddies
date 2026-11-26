// One place for page names so nav, footer, headings and buttons agree.
export const pages = {
  home: { name: "Home", path: "/" },
  about: { name: "About", path: "/about" },
  team: { name: "Our team", path: "/team" },
  events: { name: "Events", path: "/events" },
  contact: { name: "Contact", path: "/contact" },
  join: { name: "Join", path: "/join" },
} as const;

export const navLinks = [pages.about, pages.team, pages.events, pages.contact];

export const instagramUrl = "https://www.instagram.com/seniorbuddiesdurham/";

export const social = [
  { name: "Instagram", href: instagramUrl },
  { name: "Facebook", href: "https://www.facebook.com/people/Senior-Buddies-Durham/61565582833845/" },
];

// Printed on the Senior Buddies welcome banner (visible in the volunteer photos).
export const slogan = "Let's make that connection happen!";
