import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Employee {
  id: number;
  name: string;
  position: string;
  image: string;
}

const EmployeesSection = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://intellisurgetechnologies.onrender.com/api/OurTeamCareer/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch team members");
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  return (
    <section className="section-padding bg-white" id="team">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0D3B66] text-center">Meet Our Team</h2>
        <p className="text-lg text-center text-[#dc3545] mt-2">
          The talented people behind IntellSurge's innovation and success.
        </p>

        {loading && (
          <p className="text-center mt-12 text-[#0D3B66] font-medium">Loading team members...</p>
        )}

        {error && (
          <p className="text-center mt-12 text-red-600 font-medium">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-500 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-0 h-0 bg-[#dc3545] opacity-10 transition-all duration-500 group-hover:w-full group-hover:h-full z-0 rounded-lg"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-16 w-16 shadow-md">
                      <AvatarImage src={employee.image} alt={employee.name} />
                      <AvatarFallback className="bg-[#0D3B66] text-white">
                        {employee.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-[#0D3B66]">
                        {employee.name}
                      </h3>
                      <p className="text-[#dc3545] font-medium">{employee.position}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-lg text-[#0D3B66] mb-6">Want to join our amazing team?</p>
          <a
            href="#jobs"
            className="px-6 py-3 bg-[#dc3545] text-white font-semibold rounded-md hover:bg-[#0D3B66] transition-colors duration-300 inline-block"
          >
            See Open Positions
          </a>
        </div>
      </div>
    </section>
  );
};

export default EmployeesSection;
