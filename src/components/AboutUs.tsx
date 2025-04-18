import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamMember {
  name: string;
  position: string;
  image?: string;
}

const AboutUs = () => {
  const sectionRef = useRef(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Fetch team members from API
    const fetchTeam = async () => {
      try {
        const response = await axios.get('https://intellisurgetechnologies.onrender.com/api/OurTeam/');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeam();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.about-title').forEach((el) => {
              el.classList.add('animate-text-reveal');
            });
            document.querySelectorAll('.team-member').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="section-padding bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg about-title mb-4 text-center">
            <span className="text-[#dc3545]"> Meet Our Brilliant Team</span>
          </h2>
          <p className="paragraph mt-4 max-w-3xl mx-auto about-title opacity-0 text-[#0D3B66]">
            Innovative minds driving data solutions that empower your business to soar.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-member opacity-0 p-8 rounded-xl flex flex-col items-center text-center border border-[#11B5E4] shadow-lg"
            >
              <Avatar className="w-32 h-32 mb-4">
                {member.image ? (
                  <AvatarImage
                    src={
                      member.image.startsWith('http')
                        ? member.image
                        : `http://127.0.0.1:8000${member.image}`
                    }
                    alt={member.name}
                    className="object-cover rounded-full"
                  />
                ) : (
                  <AvatarFallback className="bg-[#002645] text-white text-2xl">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <h3 className="text-xl font-bold text-[#dc3545] mb-1">{member.name}</h3>
              <p className="text-[#0D3B66]">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
