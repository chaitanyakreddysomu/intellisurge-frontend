import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const EditOurTeamCareerList = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [member, setMember] = useState({
    name: "",
    position: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`https://intellisurgetechnologies.onrender.com/api/OurTeamCareer/${id}/`);
        setMember(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch team member", err);
        toast({
          title: "Error",
          description: "Could not load member details",
          variant: "destructive",
        });
        navigate("/admin/OurTeamCareer");
      }
    };

    fetchMember();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
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
      await axios.patch(`https://intellisurgetechnologies.onrender.com/api/OurTeamCareer/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Member Updated",
        description: `Successfully updated "${member.name}"`,
      });

      navigate("/admin/OurTeamCareer");
    } catch (error) {
      console.error("Error updating member:", error);
      toast({
        title: "Error",
        description: "Failed to update member. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

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
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {member.image && !imageFile && (
                <img
                  src={member.image}
                  alt="Current Profile"
                  className="w-24 h-24 object-cover mt-2 rounded-md border"
                />
              )}
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

export default EditOurTeamCareerList;
