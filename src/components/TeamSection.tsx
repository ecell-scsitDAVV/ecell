import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import RevealAnimation from './RevealAnimation';
import ImageWithFallback from './ImageWithFallback';
import { supabase } from '../integrations/supabase/client';

interface SocialLink {
  id?: string;
  icon: string;
  url: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image_url: string;
  socialLinks: SocialLink[];
}

interface TeamMemberProps {
  name: string;
  position: string;
  imageSrc: string;
  socialLinks: { icon: string; url: string }[];
  delay?: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, position, imageSrc, socialLinks, delay = 0 }) => {
  const getSocialIconColor = (platform: string) => {
    switch (platform) {
      case 'linkedin': return 'bg-[#0A66C2]';
      case 'twitter': return 'bg-[#1DA1F2]';
      case 'instagram': return 'bg-[#E4405F]';
      case 'facebook': return 'bg-[#1877F2]';
      case 'github': return 'bg-[#171515]';
      default: return 'bg-[#6e5494]';
    }
  };

  return (
    <RevealAnimation delay={delay} className="h-full">
      <div className="team-card relative bg-white dark:bg-black rounded-lg overflow-hidden h-full mx-2">
        <div className="overflow-hidden aspect-[3/4]">
          <ImageWithFallback
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-5 text-center">
          <h3 className="text-xl font-semibold mb-1 text-primary truncate">{name}</h3>

          <p className="text-blue-500 text-sm mb-3 font-medium truncate">{position}</p>

          <div className="flex justify-center space-x-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 flex items-center justify-center rounded-full ${getSocialIconColor(link.icon)} text-white hover:opacity-90 transition-opacity duration-300`}
                aria-label={`${name}'s ${link.icon}`}
              >
                <i className={`fab fa-${link.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </RevealAnimation>
  );
};

const TeamSection: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data: members, error: membersError } = await supabase
          .from('team_members')
          .select('*')
          .order('created_at', { ascending: false });

        if (membersError) {
          throw new Error(`Error fetching team members: ${membersError.message}`);
        }

        const membersWithLinks = await Promise.all(
          members.map(async (member) => {
            const { data: socialLinks, error: linksError } = await supabase
              .from('member_social_links')
              .select('*')
              .eq('member_id', member.id);

            if (linksError) {
              console.error(`Error fetching social links for member ${member.id}:`, linksError);
              return { ...member, socialLinks: [] };
            }

            return {
              ...member,
              socialLinks: socialLinks || []
            };
          })
        );

        setTeamMembers(membersWithLinks);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (isLoading) {
    return (
      <section id="team" className="py-24 px-4" style={{ backgroundColor: '#252c3b' }}>
        <div className="max-w-7xl mx-auto">
          <span className="inline-block py-1 px-3 mb-3 text-xs tracking-wider uppercase rounded-full bg-secondary text-primary font-medium">Our Team</span>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet The Leaders</h2>
            <p className="text-muted-foreground max-w-md mt-4 md:mt-0">
              Dedicated individuals committed to fostering innovation and entrepreneurship in our community.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} autoplay={true} autoplaySpeed={3000}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white dark:bg-black rounded-lg overflow-hidden h-full">
                  <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
                  <div className="p-5 text-center">
                    <div className="h-6 bg-gray-200 animate-pulse rounded mb-2 mx-auto w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-3 mx-auto w-1/2"></div>
                    <div className="flex justify-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    );
  }

  if (error && teamMembers.length === 0) {
    return (
      <section id="team" className="py-24 px-4" style={{ backgroundColor: '#252c3b' }}>
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block py-1 px-3 mb-3 text-xs tracking-wider uppercase rounded-full bg-secondary text-primary font-medium">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Meet The Leaders</h2>
          <p className="text-destructive">Error loading team members. Please try again later.</p>
        </div>
      </section>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides in desktop mode
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Adjust for mobile devices
        settings: {
          slidesToShow: 1, // Show 1 slide in mobile mode
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="team" className="py-24 px-4" style={{ backgroundColor: '#252c3b' }}>
      <div className="max-w-7xl mx-auto">
        <RevealAnimation>
          <span className="inline-block py-1 px-3 mb-3 text-xs tracking-wider uppercase rounded-full bg-secondary text-primary font-medium">Our Team</span>
        </RevealAnimation>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <RevealAnimation delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet The Leaders</h2>
          </RevealAnimation>
          
          <RevealAnimation delay={200}>
            <p className="text-muted-foreground max-w-md mt-4 md:mt-0">
              Dedicated individuals committed to fostering innovation and entrepreneurship in our community.
            </p>
          </RevealAnimation>
        </div>
        
        <Slider {...sliderSettings}>
          {teamMembers.map((member, index) => (
            <div className="flex justify-center" key={member.id}>
              <TeamMember
                name={member.name}
                position={member.position}
                imageSrc={member.image_url}
                socialLinks={member.socialLinks}
                delay={100 * (index + 1)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TeamSection;
