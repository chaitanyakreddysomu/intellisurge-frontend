import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";

interface Partner {
  id: number;
  company: string;
  name: string;
  image: string;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPartners();
  }, []);

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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this partner?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://intellisurgetechnologies.onrender.com/api/Partners/${id}/`);
      setPartners(partners.filter((partner) => partner.id !== id));
    } catch (error) {
      console.error("Failed to delete partner:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Our Partners</h1>
        <Button asChild>
          <Link to="/admin/Partners/add">Add Partner</Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading partners...</p>
      ) : partners.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <p className="text-lg font-medium mb-2">No partners found</p>
          <p className="text-gray-500">Partners will be shown here once added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id} className="bg-white border border-gray-200 shadow-sm rounded-lg h-40">
              <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4 h-full">
                <img
                  src={partner.image}
                  alt={partner.company}
                  className="w-24 h-24 rounded-full border border-gray-300 object-contain p-1"
                />

                <div className="flex-1 w-full space-y-1 overflow-hidden">
                  <h4 className="font-semibold text-blue-600 break-words line-clamp-1">
                    {partner.company}
                  </h4>
                  <p className="text-sm text-gray-500 break-words line-clamp-1">
                    {partner.name}
                  </p>
                </div>

                <div className="flex flex-row gap-2 self-start sm:self-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/admin/Partners/edit/${partner.id}`)}
                    className="text-blue-600 hover:bg-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(partner.id)}
                    className="text-red-600 hover:bg-red-600"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Partners;
