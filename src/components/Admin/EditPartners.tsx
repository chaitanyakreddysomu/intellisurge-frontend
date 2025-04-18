import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const EditPartners = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [partner, setPartner] = useState({
    company: "",
    name: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await axios.get(`https://intellisurgetechnologies.onrender.com/api/Partners/${id}/`);
        const { company, name, image } = response.data;
        setPartner({ company, name });
        setExistingImage(image); // Image URL
      } catch (error) {
        console.error("Error fetching partner:", error);
        toast({
          title: "Error",
          description: "Failed to load partner details.",
          variant: "destructive",
        });
      }
    };

    if (id) fetchPartner();
  }, [id, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPartner({ ...partner, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("company", partner.company);
    formData.append("name", partner.name);
    if (logoFile) {
      formData.append("image", logoFile);
    }

    try {
      await axios.put(`https://intellisurgetechnologies.onrender.com/api/Partners/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Partner Updated",
        description: `"${partner.company}" details updated successfully.`,
      });

      navigate("/admin/Partners");
    } catch (error) {
      console.error("Error updating partner:", error);
      toast({
        title: "Error",
        description: "Failed to update partner. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Partner</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={partner.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Partner Name</Label>
              <Input
                id="name"
                name="name"
                value={partner.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Company Logo</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {existingImage && !logoFile && (
                <img
                  src={existingImage}
                  alt="Current Logo"
                  className="mt-2 h-24 rounded shadow"
                />
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit">Update Partner</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPartners;
