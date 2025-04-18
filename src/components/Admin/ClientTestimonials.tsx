import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";

interface Testimonial {
  id: number;
  author: string;
  position: string;
  stars: number;
  Content: string;
}

const ClientTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("https://intellisurgetechnologies.onrender.com/api/Client-Testimonials/");
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
      await axios.delete(`https://intellisurgetechnologies.onrender.com/api/Client-Testimonials/${id}/`);
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Client Testimonials</h1>
        <Button asChild>
          <Link to="/admin/ClientTestimonials/add">Add Testimonial</Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <p className="text-lg font-medium mb-2">No testimonials found</p>
          <p className="text-gray-500">Testimonials will appear here once clients submit them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative bg-white border border-gray-200 shadow-sm rounded-lg">
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/admin/ClientTestimonials/edit/${testimonial.id}`)}
                  className="text-blue-600 hover:bg-blue-700"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-600 hover:bg-red-700"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
              <CardContent className="p-6">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < testimonial.stars ? "text-yellow-500" : "text-gray-300"} mr-1`}
                    ></i>
                  ))}
                </div>
                <p className="text-gray-800 italic mb-4 line-clamp-3 break-words whitespace-pre-wrap min-h-[72px]">
                  "{testimonial.Content}"
                </p>
                <h4 className="font-semibold text-blue-600 break-words line-clamp-1 whitespace-pre-wrap">{testimonial.author}</h4>
                <p className="text-sm text-gray-500 break-words line-clamp-1 whitespace-pre-wrap">{testimonial.position}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientTestimonials;
