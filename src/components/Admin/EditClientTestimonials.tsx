import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const EditClientTestimonials = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [testimonial, setTestimonial] = useState({
    author: "",
    position: "",
    stars: 0,
    Content: "",
  });

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const fetchTestimonial = async () => {
    try {
      const response = await axios.get(
        `https://intellisurgetechnologies.onrender.com/api/Client-Testimonials/${id}/`
      );
      setTestimonial(response.data);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to fetch testimonial.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTestimonial({ ...testimonial, [name]: value });
  };

  const handleStarClick = (value: number) => {
    setTestimonial((prev) => ({ ...prev, stars: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://intellisurgetechnologies.onrender.com/api/Client-Testimonials/${id}/`, {
        ...testimonial,
        stars: testimonial.stars.toString(),
      });

      toast({
        title: "Testimonial Updated",
        description: `Successfully updated for "${testimonial.author}"`,
        
      });

      navigate("/admin/ClientTestimonials");
    } catch (error) {
      console.error("Error updating testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to update testimonial. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Client Testimonial</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={testimonial.author}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={testimonial.position}
                  onChange={handleChange}
                  placeholder="CTO, Company Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stars">Star Rating</Label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleStarClick(star)}
                      className={`text-2xl ${
                        star <= testimonial.stars ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="Content">Testimonial Content</Label>
                <Textarea
                  id="Content"
                  name="Content"
                  value={testimonial.Content}
                  onChange={handleChange}
                  placeholder="Share the client's feedback here..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">Update Testimonial</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EditClientTestimonials;
    