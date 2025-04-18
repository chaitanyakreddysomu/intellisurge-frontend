import React from 'react';
import { Code, Heart, Lightbulb, Users, Briefcase, Globe } from 'lucide-react';

const CultureSection = () => {
  const values = [
    {
      title: "Innovation",
      description: "We push boundaries and explore new frontiers in technology to solve complex problems.",
      icon: <Lightbulb className="h-10 w-10 text-[#dc3545]" />
    },
    {
      title: "Collaboration",
      description: "We believe great ideas emerge when diverse minds work together in an environment of mutual respect.",
      icon: <Users className="h-10 w-10 text-[#dc3545]" />
    },
    {
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from coding to customer service.",
      icon: <Briefcase className="h-10 w-10 text-[#dc3545]" />
    },
    {
      title: "Passion",
      description: "We're genuinely excited about technology and its potential to transform lives and businesses.",
      icon: <Heart className="h-10 w-10 text-[#dc3545]" />
    },
    {
      title: "Impact",
      description: "We measure our success by the positive difference we make for our clients and communities.",
      icon: <Globe className="h-10 w-10 text-[#dc3545]" />
    },
    {
      title: "Continuous Learning",
      description: "We embrace change and constantly seek to expand our knowledge and skills.",
      icon: <Code className="h-10 w-10 text-[#dc3545]" />
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#0D3B66] text-center mb-4">Our Culture & Values</h2>
        <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
          At IntellSurge, our culture is defined by our shared commitment to these core values that guide everything we do.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-[#f9f9f9] p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-[#0D3B66] hover:text-white group"
            >
              <div className="mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white text-[#0D3B66]">
                {value.title}
              </h3>
              <p className="text-gray-700 group-hover:text-white">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;