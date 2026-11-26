// Photos of Senior Buddies volunteers. The names on the volunteer photos are
// written on the images themselves.
import abigail from "@/assets/teamMembers/abigail.webp";
import aksha from "@/assets/teamMembers/aksha.webp";
import chloe from "@/assets/teamMembers/chloe.webp";
import frankie from "@/assets/teamMembers/frankie.webp";
import jacklyn from "@/assets/teamMembers/jacklyn.webp";
import raifah from "@/assets/teamMembers/raifah.webp";
import sophia from "@/assets/teamMembers/sophia.webp";
import swetAndrewAarush from "@/assets/teamMembers/swetandrewandaarush.webp";
import violetEmily from "@/assets/teamMembers/violetandemily.webp";
import volunteersTrip from "@/assets/volunteers-trip.webp";
import busTrip from "@/assets/bus-trip.webp";

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const photos = {
  volunteersTrip: {
    src: volunteersTrip,
    width: 1600,
    height: 900,
    alt: "Three volunteers in light blue Senior Buddies T-shirts stand arm in arm in a parking lot at sunset.",
  },
  busTrip: {
    src: busTrip,
    width: 1600,
    height: 900,
    alt: "A volunteer in a Senior Buddies T-shirt stands in the aisle of a coach bus full of seniors while a woman speaks into a microphone.",
  },
} satisfies Record<string, Photo>;

export const volunteerPhotos: Photo[] = [
  { src: frankie, width: 889, height: 500, alt: "Eight volunteers in Senior Buddies T-shirts pose beside the welcome banner. Frankie's name is written on the photo." },
  { src: aksha, width: 396, height: 500, alt: "Aksha, wearing headphones, smiles while holding a pot of daisies." },
  { src: swetAndrewAarush, width: 559, height: 500, alt: "Swet, Aarush and Andrew stand with arms crossed in Senior Buddies T-shirts in front of a stage." },
  { src: chloe, width: 333, height: 500, alt: "Chloe smiles, holding a bunch of daisies." },
  { src: violetEmily, width: 680, height: 500, alt: "Violet and Emily in Senior Buddies T-shirts stand outdoors with a person dressed as Captain America." },
  { src: jacklyn, width: 406, height: 500, alt: "Jacklyn speaks into a microphone at a podium." },
  { src: sophia, width: 508, height: 500, alt: "Sophia, in a Santa hat, leans over a table while a senior looks at a phone." },
  { src: abigail, width: 414, height: 500, alt: "Abigail makes peace signs beside the Senior Buddies banner." },
  { src: raifah, width: 590, height: 500, alt: "Raifah, in a Santa hat, takes a selfie in a hall with blue chairs." },
];
