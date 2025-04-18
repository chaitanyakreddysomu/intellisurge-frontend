import React from 'react';
import { FileText, Users, Phone, Calendar, CheckCircle } from 'lucide-react';

const ApplicationProcess = () => {
  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-white" />,
      title: "Application Review",
      description: "Submit your resume and cover letter. Our hiring team will review your qualifications and experience."
    },
    {
      icon: <Phone className="h-8 w-8 text-white" />,
      title: "Initial Screening",
      description: "A 30-minute phone or video call with our recruiter to discuss your background and the role."
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Technical Assessment",
      description: "Depending on the role, you'll complete a skills assessment or technical project."
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Team Interviews",
      description: "Meet with potential team members and managers to discuss your experience and fit for the role."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      title: "Decision & Offer",
      description: "We'll make a prompt decision and extend an offer to successful candidates."
    }
  ];

  return (
    <section className="section-padding bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0D3B66] text-center">Our Hiring Process</h2>
        <p className="text-lg text-center text-[#dc3545] mt-2 mb-10">
          We've designed our application process to be thorough, transparent, and respectful of your time.
        </p>

        <div className="relative mt-20">
          {/* Progress Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#11B5E4] transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <h3 className="text-xl font-bold text-[#0D3B66] mb-2">{step.title}</h3>
                <p className="text-gray-600 max-w-md mx-auto md:mx-0">{step.description}</p>
              </div>

              <div className="my-6 md:my-0 flex-shrink-0 z-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#0D3B66] to-[#11B5E4] shadow-lg">
                  {step.icon}
                </div>
              </div>

              <div className="md:w-1/2"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-6 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-[#0D3B66] mb-4">We Value Your Time</h3>
          <p className="text-gray-600">
            Our goal is to complete the entire process within 2-3 weeks, with clear communication at every step.
            We respect that you're considering joining our team and want to ensure a positive experience
            regardless of the outcome.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;