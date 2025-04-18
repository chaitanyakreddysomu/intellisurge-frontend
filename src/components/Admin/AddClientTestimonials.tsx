import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AddClientTestimonials = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState({
    author: "",
    position: "",
    stars: 0,
    Content: "",
  });

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
      const response = await axios.post(
        "https://intellisurgetechnologies.onrender.com/api/Client-Testimonials/",
        {
          ...testimonial,
          stars: testimonial.stars.toString(), // assuming your backend expects string for "stars"
        }
      );

      toast({
        title: "Testimonial Added",
        description: `Successfully added by "${testimonial.author}"`,
      });

      navigate("/admin/ClientTestimonials");
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to add testimonial. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Client Testimonial</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>

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
              <Button type="submit">Add Testimonial</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddClientTestimonials;
