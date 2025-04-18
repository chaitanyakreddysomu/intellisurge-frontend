import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const EditTeamTestimonials = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [testimonial, setTestimonial] = useState({
    name: "",
    position: "",
    Content: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const fetchTestimonial = async () => {
    try {
      const response = await axios.get(`https://intellisurgetechnologies.onrender.com/api/Team-Testimonials/${id}/`);
      setTestimonial(response.data);
      setPreviewUrl(response.data.image);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestimonial({ ...testimonial, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", testimonial.name);
    formData.append("position", testimonial.position);
    formData.append("Content", testimonial.Content);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await axios.put(`https://intellisurgetechnologies.onrender.com/api/Team-Testimonials/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Testimonial Updated",
        description: `Successfully updated for "${testimonial.name}"`,
      });

      navigate("/admin/TeamTestimonials");
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
        <h1 className="text-2xl font-bold text-gray-800">Edit Team Testimonial</h1>
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={testimonial.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
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
                  placeholder="Designer"
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
                  placeholder="Their feedback..."
                  className="min-h-[150px]"
                  required
                />
              </div>
              {previewUrl && (
                  <div className="mt-2">
                    <Label className="text-sm text-muted-foreground">Preview:</Label>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mt-2 w-24 h-24 rounded-full object-cover border"
                    />
                  </div>
                )}
              <div className="space-y-2">
                <Label htmlFor="image">Upload New Image</Label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
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

export default EditTeamTestimonials;
