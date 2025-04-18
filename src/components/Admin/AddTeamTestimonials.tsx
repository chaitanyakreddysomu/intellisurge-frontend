import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AddTeamTestimonials = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState({
    name: "",
    position: "",
    Content: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTestimonial({ ...testimonial, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", testimonial.name);
    formData.append("position", testimonial.position);
    formData.append("Content", testimonial.Content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.post("https://intellisurgetechnologies.onrender.com/api/Team-Testimonials/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Testimonial Added",
        description: `Successfully added by "${testimonial.name}"`,
      });

      navigate("/admin/TeamTestimonials");
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
        <h1 className="text-2xl font-bold text-gray-800">Add Team Testimonial</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={testimonial.name}
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
                placeholder="Software Engineer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Content">Testimonial Content</Label>
              <Textarea
                id="Content"
                name="Content"
                value={testimonial.Content}
                onChange={handleChange}
                placeholder="Share the team member's experience here..."
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

export default AddTeamTestimonials;
