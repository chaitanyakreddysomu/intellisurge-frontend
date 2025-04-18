import React from "react";
import Navbar from "../components/Navbar"; // Adjust path as needed
// import HeroSection from "../components/CareerPage/HeroSection"; // Adjust path as needed
import HeroMain from "../components/ServicesPage/HeroMain"
import TechnologiesSection from "@/components/ServicesPage/TechnologiesSection";
import ServicesSection from "@/components/ServicesPage/ServicesSection";
import ExpertiseSection from "@/components/ServicesPage/ExpertiseSection";
import ResourcesSection from "@/components/ServicesPage/ResourcesSection";
import ToolsSection from "@/components/ServicesPage/ToolSection";
import ContactSection from "@/components/ServicesPage/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ServicePage = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
    {/* <div className="min-h-screen bg-background overflow-x-hidden"></div> */}
      <Navbar />
      <HeroMain />
      <TechnologiesSection />
      <ServicesSection />
      <ExpertiseSection />
      <ResourcesSection />
      
      <ToolsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default ServicePage;
