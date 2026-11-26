// Events, taken from posts on instagram.com/seniorbuddiesdurham.
//
// To add one: copy an entry, put it at the top, and fill it in from the post.
// - date: the event date (YYYY-MM-DD). If the post doesn't say, use the day it
//   was posted and set `postedOnly: true` so the page shows "Posted" instead.
// - Events dated today or later appear under "Coming up"; the rest under "Past".

export interface SiteEvent {
  title: string;
  date: string;
  postedOnly?: boolean;
  time?: string;
  place: string;
  summary: string;
  instagram: string;
  register?: string;
}

export const events: SiteEvent[] = [
  {
    title: "Autumn Art Event",
    date: "2026-10-14",
    time: "6:00 to 8:30 p.m.",
    place: "Audley Recreation Centre, 1955 Audley Rd, Ajax (Multipurpose Room)",
    summary: "Personalized fall art, games and a community gathering, open to youth and seniors. Made possible by SBC Arts and CANSA.",
    instagram: "https://www.instagram.com/p/DeNrpfex7t_/",
  },
  {
    title: "CPR and first-aid training for volunteers",
    date: "2026-10-03",
    postedOnly: true,
    place: "Pickering Public Library",
    summary: "D'Care Foundation trained Senior Buddies volunteers in CPR and first aid.",
    instagram: "https://www.instagram.com/p/DeCXHiNkYhs/",
  },
  {
    title: "Bracelet making",
    date: "2026-09-21",
    postedOnly: true,
    place: "Pickering Public Library",
    summary: "An afternoon of picking out beads and designing bracelets together.",
    instagram: "https://www.instagram.com/p/Ddj9tI6m45r/",
  },
  {
    title: "PROBUS Clubs Senior BBQ",
    date: "2026-08-13",
    postedOnly: true,
    place: "Alex Robertson Park",
    summary: "Volunteers ran bingo, bean bag toss, golf putting and the rope game at the PROBUS Clubs' BBQ for seniors.",
    instagram: "https://www.instagram.com/p/Db_8yokkaWu/",
  },
  {
    title: "Valentine's Day event",
    date: "2026-02-16",
    postedOnly: true,
    place: "Pickering Public Library",
    summary: "Youth and seniors made Valentine's cards together. 45 handmade cards went to the Ajax Pickering Hospital Foundation for patients.",
    instagram: "https://www.instagram.com/p/DU1z4tUkTFc/",
  },
];
