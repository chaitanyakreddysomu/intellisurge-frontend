import React, { useEffect, useState } from "react";

const stats = [
  { title: "Projects", value: 30, color: "#0D3B66" },
  { title: "Clients", value: 50, color: "#dc3545" },
  { title: "Staff", value: 60, color: "#11B5E4" },
];

const StatsSection = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("stats-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check immediately
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const updatedCounts = [...counts];

      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 1500;
        const increment = Math.ceil(end / (duration / 30));

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          updatedCounts[index] = start;
          setCounts([...updatedCounts]);
        }, 30);
      });
    }
  }, [isVisible]);

  return (
    <div id="stats-section" className="w-full flex justify-center my-27">
      <div className="w-4/5 grid grid-cols-1 md:grid-cols-3 gap-12 bg-white p-12 rounded-lg shadow-lg">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2
              className="text-5xl font-extrabold mb-4"
              style={{ color: stat.color }}
            >
              {counts[index]}+
            </h2>
            <p className="text-lg font-semibold text-gray-700">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
