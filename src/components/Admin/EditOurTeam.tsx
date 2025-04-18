import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditOurTeam = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams(); // Get team member ID from URL

  const [member, setMember] = useState({
    name: "",
    position: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      const response = await axios.get(`https://intellisurgetechnologies.onrender.com/api/OurTeam/${id}/`);
      setMember(response.data);
    } catch (error) {
      console.error("Error fetching member:", error);
      toast({
        title: "Error",
        description: "Failed to load team member.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", member.name);
    formData.append("position", member.position);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.patch(`https://intellisurgetechnologies.onrender.com/api/OurTeam/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Team Member Updated",
        description: `"${member.name}" was successfully updated.`,
      });

      navigate("/admin/OurTeam");
    } catch (error) {
      console.error("Error updating member:", error);
      toast({
        title: "Error",
        description: "Failed to update team member.",
        variant: "destructive",
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Team Member</h1>
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
                value={member.name}
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
                value={member.position}
                onChange={handleChange}
                placeholder="CTO, Company Name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              {member.image && (
                <img
                  src={member.image.startsWith("http") ? member.image : `http://127.0.0.1:8000${member.image}`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border mb-2"
                />
              )}
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="text-sm text-gray-500">Upload to replace the existing image.</p>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Update Member</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditOurTeam;
