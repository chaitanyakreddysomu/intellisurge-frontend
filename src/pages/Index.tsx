import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import AboutUs from "../components/AboutUs";
// import Career from "../components/Career";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/contact";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Service from "../components/Service";
import BlogsPage from "../components/BlogsPage";
import PartnersSection from "@/components/PartnersSection";
// import CultureSection from "../components/CareerPage/CultureSection";
// import EmployeesSection from "../components/CareerPage/EmployeesSection";




const Index = () => {
  const servicesRef = useRef<HTMLElement | null>(null);
  const blogsRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const section = new URLSearchParams(location.search).get("scrollTo");
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, [location.search]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar servicesRef={servicesRef} blogsRef={blogsRef} />
      <Hero />
      <Process /> {/* 👈 This should have id="process" inside it */}
      <Features />
      <AboutUs />
      {/* <Career /> */}
      {/* <EmployeesSection/> */}
      <StatsSection />
      <Service ref={servicesRef} />
      <Testimonials />
      <div ref={blogsRef}>
        <BlogsPage />
      </div>
      <PartnersSection />

      <CallToAction />
      {/* <CultureSection /> */}
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
