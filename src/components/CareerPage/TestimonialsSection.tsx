
import React, { useEffect, useState } from 'react';
import Chatbot from '../Chatbot';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('https://intellisurgetechnologies.onrender.com/api/Team-Testimonials/')
      .then(response => response.json())
      .then(data => setTestimonials(data))
      .catch(error => console.error('Error fetching testimonials:', error));
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0D3B66] text-center">What Our Team Says</h2>
        <p className="text-lg text-center text-[#dc3545] mt-2 mb-10">
          Hear directly from our talented team members about their experiences working at IntellSurge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#F9FAFB] rounded-xl p-6 shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300 flex flex-col h-full"
            >
              <div className="flex-grow">
                <div className="mb-6 text-[#11B5E4]">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.Content}"</p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-[#0D3B66]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between bg-[#F1F9FC] p-8 rounded-xl mt-16">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-[#0D3B66] mb-2">Want to join our team?</h3>
            <p className="text-gray-600">
              We're always looking for talented individuals to help us shape the future.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#jobs"
              className="px-6 py-3 bg-[#0D3B66] text-white font-semibold rounded-md hover:bg-[#11B5E4] transition-colors text-center"
            >
              View Open Positions
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-[#0D3B66] text-[#0D3B66] font-semibold rounded-md hover:bg-[#F1F9FC] transition-colors text-center"
            >
              Learn About Our Culture
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
