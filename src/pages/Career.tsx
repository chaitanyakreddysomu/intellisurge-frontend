import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/CareerPage/HeroSection";
import CultureSection from "../components/CareerPage/CultureSection";
import Footer from "../components/Footer";
import EmployeesSection from "@/components/CareerPage/EmployeesSection";
import JobListings from "@/components/CareerPage/JobListings";
import BenefitsSection from "@/components/CareerPage/BenefitsSection";
import ApplicationProcess from "@/components/CareerPage/ApplicationProcess";
import TestimonialsSection from "@/components/CareerPage/TestimonialsSection";
import Chatbot from "@/components/Chatbot";
import Testimonials from "@/components/Testimonials";

const Career = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CultureSection />
      <EmployeesSection />
      <JobListings />
      {/* <BenefitsSection /> */}
      <ApplicationProcess />
      <TestimonialsSection />
      <Testimonials />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Career;
