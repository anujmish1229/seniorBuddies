import { useEffect, useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Mail, Linkedin } from "lucide-react";
import tanishkaImage from "@/assets/tanishka.png";
import anujImage from "@/assets/anuj.png";
import harshImage from "@/assets/harsh.png";

// Import all youth volunteer images
const youthVolunteerImages = import.meta.glob("@/assets/teamMembers/*.jpeg", { eager: true, import: "default" }) as Record<string, string>;
const youthVolunteerImageArray = Object.values(youthVolunteerImages);

const shadowColors = ['#ffd1d1', '#ffdd84', '#f9defd', '#dcf5cf', '#f5e1fa', '#d0f4f4', '#fff5ba'];

const teamMembers = [
  {
    name: "Tanishka Sharma",
    role: "Founder & Director",
    bio: "I am a Grade 12 high school student in Durham Region and I founded Senior Buddies in 2023 to help reduce loneliness among both seniors and youth through intergenerational connection. I hope to pursue a future career in medicine, and in my spare time I love playing chess and figure skating.",
    email: "tanishka@seniorbuddiesdurham.ca",
    linkedin: "https://www.linkedin.com/in/tanishka-sharma-7a580b355/",
    image: tanishkaImage,
  },
  {
    name: "Anuj Mishra",
    role: "Board Member",
    bio: "Hey! I'm Anuj Mishra, I'm a 12th grade student at Pickering High School. I love robotics and making a difference in the community.",
    email: "anuj@seniorbuddiesdurham.ca",
    linkedin: "https://www.linkedin.com/in/anujmmishra/",
    image: anujImage,
  },
  {
    name: "Harsh Patel",
    role: "Board Member",
    bio: "Hi, my name is Harsh Patel. I'm 17 years old currently attending Pine Ridge and aspire to become an RN in the emergency room. I joined Senior Buddies to make a difference within the community.",
    email: "harsh@seniorbuddiesdurham.ca",
    linkedin: "https://www.linkedin.com/in/harsh-patel-b0b0b0b0b0/",
    image: harshImage,
  },
];

// Shuffle array function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Team = () => {
  const [memberColors, setMemberColors] = useState<string[]>([]);
  const [rowImages] = useState(() => {
    // Each row gets all images, but in different random orders
    return [
      shuffleArray(youthVolunteerImageArray),
      shuffleArray(youthVolunteerImageArray),
      shuffleArray(youthVolunteerImageArray),
    ];
  });
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Senior Buddies - Team";
    // Randomly assign colors to each team member
    const colors = teamMembers.map(() => {
      return shadowColors[Math.floor(Math.random() * shadowColors.length)];
    });
    setMemberColors(colors);
  }, []);

  // Infinite scroll for each row at different speeds
  useEffect(() => {
    const scrollSpeeds = [0.7, 0.5, 0.9]; // Different speeds for each row (pixels per frame)
    const refs = [row1Ref, row2Ref, row3Ref];
    const animationFrameIds: (number | null)[] = [null, null, null];

    refs.forEach((ref, index) => {
      const container = ref.current;
      if (!container) return;

      const content = container.children[0] as HTMLElement;
      if (!content) return;

      // Wait for images to load and layout to calculate width
      const initScroll = () => {
        // Wait for all images in the row to load
        const images = content.querySelectorAll('img');
        let loadedCount = 0;
        
        const checkAllLoaded = () => {
          loadedCount++;
          if (loadedCount < images.length) return;
          
          // Small delay to ensure layout is calculated
          setTimeout(() => {
            // Force a reflow to get accurate measurements
            void content.offsetWidth;
            const contentWidth = content.scrollWidth;
            const singleSetWidth = contentWidth / 2; // We duplicate content, so half is one set
            
            let translateX = 0;

            const animate = () => {
              translateX -= scrollSpeeds[index];
              
              // Reset when scrolled past one set - add the width back to create seamless loop
              if (translateX <= -singleSetWidth) {
                translateX += singleSetWidth;
              }
              
              content.style.transform = `translateX(${translateX}px)`;
              animationFrameIds[index] = requestAnimationFrame(animate);
            };

            animationFrameIds[index] = requestAnimationFrame(animate);
          }, 50);
        };

        if (images.length === 0) {
          // No images, start immediately
          checkAllLoaded();
        } else {
          images.forEach((img) => {
            if (img.complete) {
              checkAllLoaded();
            } else {
              img.addEventListener('load', checkAllLoaded, { once: true });
              img.addEventListener('error', checkAllLoaded, { once: true });
            }
          });
        }
      };

      // Wait a bit for DOM to be ready
      setTimeout(initScroll, 100);
    });

    return () => {
      animationFrameIds.forEach(id => {
        if (id !== null) cancelAnimationFrame(id);
      });
    };
  }, [rowImages]);
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-6">
              Meet Our Team
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Dedicated individuals working to bring generations together in Durham Region.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="h-48 flex items-center justify-center"
                  style={{ backgroundColor: memberColors[index] || shadowColors[0] }}
                >
                  <div className="w-32 h-32 bg-card rounded-full flex items-center justify-center shadow-soft">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground">{member.name}</h3>
                    <p className="text-primary font-body font-medium">{member.role}</p>
                  </div>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex gap-3 pt-2">
                    <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Youth Volunteers Gallery */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Our Youth Volunteers
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Meet the amazing young people making a difference in our community.
            </p>
          </div>
        </div>

        {/* Three rows of scrolling images */}
        <div className="space-y-4 overflow-hidden">
          {[0, 1, 2].map((rowIndex) => {
            const rowRef = rowIndex === 0 ? row1Ref : rowIndex === 1 ? row2Ref : row3Ref;
            const images = rowImages[rowIndex];
            
            return (
              <div
                key={rowIndex}
                ref={rowRef}
                className="overflow-x-hidden"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <div 
                  className="flex gap-2"
                  style={{ 
                    width: 'max-content',
                    willChange: 'transform',
                  }}
                >
                  {/* Render 2 sets for seamless loop */}
                  {[1, 2].map((setIndex) => (
                    images.map((image, imageIndex) => (
                      <div
                        key={`row-${rowIndex}-set-${setIndex}-${imageIndex}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={image}
                          alt={`Youth volunteer ${imageIndex + 1}`}
                          className="h-48 object-contain rounded-sm"
                          style={{ width: 'auto', display: 'block' }}
                        />
                      </div>
                    ))
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Join Our Team</h2>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              We're always looking for passionate individuals to join our mission. Check out current opportunities or reach out to learn more.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-soft hover:shadow-card font-body"
            >
              <Mail className="h-5 w-5" />
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
