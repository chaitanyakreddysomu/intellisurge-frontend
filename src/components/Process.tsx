import React, { useEffect, useRef } from 'react';
import { MessageSquare, FileText, Code, Bug, UploadCloud, LifeBuoy,Compass } from 'lucide-react';
import "./Css/Process.css";

const steps = [
  {
    id: '01',
    name: 'Discovery',
    description: 'We begin by understanding your business goals, target audience, and project requirements.',
    icon: Compass,
  },
  {
    id: '02',
    name: 'Design',
    description: 'Wireframes and mockups are created to shape your product’s look and feel.',
    icon: FileText,
  },
  {
    id: '03',
    name: 'Development',
    description: 'Our developers bring the designs to life with clean, scalable code.',
    icon: Code,
  },
  {
    id: '04',
    name: 'Testing',
    description: 'We rigorously test every feature to ensure a smooth and bug-free experience.',
    icon: Bug,
  },
  {
    id: '05',
    name: 'Deployment',
    description: 'Your product is deployed to the live environment with all configurations in place.',
    icon: UploadCloud,
  },
  {
    id: '06',
    name: 'Support',
    description: 'We provide continuous support and maintenance to ensure long-term success.',
    icon: LifeBuoy,
  },
];

const Process = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.process-title').forEach(el => {
              el.classList.add('animate-text-reveal');
            });
            document.querySelectorAll('.process-step').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="process" className="section-padding bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="heading-lg process-title opacity-0 mb-4 text-black">
            Our simple 6-step process<br />
            to build your <span className="text-[#dc3545]">solution</span>
          </h2>
          <p className="paragraph mt-4 process-title opacity-0 text-gray-700">
            We follow a structured yet flexible process to ensure your solution's success, adapting to your unique needs and goals along the way.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="process-step opacity-0 p-8 rounded-xl bg-[#fff] transition-all duration-300 hover:bg-[#002645] hover:text-primary group text-left"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#002645] border border-[#002645]/20 transition-all duration-300 group-hover:bg-[#fff] group-hover:border-[#002645]">
                  <step.icon className="h-8 w-8 text-[#fff] group-hover:text-[#002645]" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-black group-hover:text-[#fff]">
                {step.name}
              </h3>
              <p className="text-gray-700 text-sm group-hover:text-[#fff]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
