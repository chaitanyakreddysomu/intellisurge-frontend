import React from 'react';
import { HeartPulse, Plane, BookOpen, Coffee, DollarSign, Battery } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <HeartPulse className="h-8 w-8 text-[#11B5E4]" />,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance. Plus mental health support and wellness programs."
    },
    {
      icon: <Plane className="h-8 w-8 text-[#11B5E4]" />,
      title: "Flexible Time Off",
      description: "Generous PTO policy to ensure you have time to rest, recharge, and explore the world."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-[#11B5E4]" />,
      title: "Learning & Development",
      description: "Annual learning budget for conferences, courses, books, and other professional development."
    },
    {
      icon: <Coffee className="h-8 w-8 text-[#11B5E4]" />,
      title: "Work-Life Balance",
      description: "Flexible working hours and remote work options to help you thrive both personally and professionally."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-[#11B5E4]" />,
      title: "Competitive Compensation",
      description: "Attractive salary packages with equity options and regular performance-based bonuses."
    },
    {
      icon: <Battery className="h-8 w-8 text-[#11B5E4]" />,
      title: "Parental Leave",
      description: "Generous parental leave policy for all parents, regardless of gender or family status."
    }
  ];

  return (
    <section className="section-padding bg-white" id="benefits">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0D3B66] text-center">Benefits & Perks</h2>
        <p className="text-lg text-center text-[#dc3545] mt-2 mb-10">
          We believe in taking care of our team members and providing everything you need to do your best work.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300 hover:border-[#11B5E4] hover:scale-[1.02] group"
            >
              <div className="inline-block p-3 bg-[#11B5E4]/10 rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#0D3B66] mb-3 group-hover:text-[#dc3545] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#0D3B66] to-[#11B5E4] rounded-xl p-10 text-white shadow-lg">
  <div className="flex flex-col items-center text-center space-y-4">
    <h3 className="text-3xl font-bold text-[#dc3545]">Ready to grow with us?</h3>
    <p className="text-[#dc3545] text-lg max-w-xl">
      Join our team and help us shape the future of technology.
    </p>
    <a 
      href="#jobs" 
      className="inline-block px-8 py-3 bg-white text-[#0D3B66] font-semibold rounded-full hover:bg-[#dc3545] hover:text-[#0D3B66] transition-all duration-300 shadow-md hover:shadow-xl"
    >
      Browse Open Positions
    </a>
  </div>
</div>


      </div>
    </section>
  );
};

export default BenefitsSection;
