import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Partner {
  id: number;
  company: string;
  name: string;
  image?: string;
}

const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get("https://intellisurgetechnologies.onrender.com/api/Partners/");
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B66] mb-4">Our Partners & Network</h2>
          <p className="text-lg text-[#0D3B66]/80 max-w-3xl mx-auto">
            We collaborate with industry leaders to deliver exceptional solutions and services
          </p>
        </div>

        {loading ? (
          <p className="text-center text-[#0D3B66]/70">Loading partners...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <Card
                key={partner.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl border border-[#11B5E4]/30 bg-white"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-14 w-14 mr-4 border border-[#11B5E4]/40 bg-white">
                      {partner.image ? (
                        <AvatarImage
                          src={partner.image}
                          alt={partner.company}
                          className="object-contain p-1"
                        />
                      ) : (
                        <AvatarFallback className="bg-[#11B5E4]/10 text-[#0D3B66] font-bold">
                          {partner.company
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-[#0D3B66]">{partner.company}</h3>
                      <p className="text-sm text-[#0D3B66]/70">Led by {partner.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
