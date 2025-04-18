import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";

interface TeamTestimonial {
  id: number;
  name: string;
  position: string;
  image: string;
  Content: string;
}

const TeamTestimonials = () => {
  const [testimonials, setTestimonials] = useState<TeamTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("https://intellisurgetechnologies.onrender.com/api/Team-Testimonials/");
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this testimonial?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://intellisurgetechnologies.onrender.com/api/Team-Testimonials/${id}/`);
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Testimonials</h1>
        <Button asChild>
          <Link to="/admin/TeamTestimonials/add">Add Testimonial</Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <p className="text-lg font-medium mb-2">No testimonials found</p>
          <p className="text-gray-500">Testimonials will appear here once your team submits them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white border border-gray-200 shadow-sm rounded-lg h-48"
            >
              <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4 h-full">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />

                <div className="flex-1 w-full space-y-2 overflow-hidden">
                  <p className="text-gray-800 italic break-words whitespace-pre-wrap line-clamp-2">
                    "{testimonial.Content}"
                  </p>
                  <h4 className="font-semibold text-blue-600 break-words line-clamp-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 break-words line-clamp-1">
                    {testimonial.position}
                  </p>
                </div>

                <div className="flex flex-row gap-2 self-start sm:self-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/admin/TeamTestimonials/edit/${testimonial.id}`)}
                    className="text-blue-600 hover:bg-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(testimonial.id)}
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

export default TeamTestimonials;
