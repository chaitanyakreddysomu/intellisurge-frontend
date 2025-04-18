import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string; // assuming image is a URL
}

const OurTeamList = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("https://intellisurgetechnologies.onrender.com/api/OurTeam/");
      setTeam(response.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://intellisurgetechnologies.onrender.com/api/OurTeam/${id}/`);
      setTeam(team.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Our Team</h1>
        <Button asChild>
          <Link to="/admin/OurTeam/add">Add New Member</Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading team members...</p>
      ) : team.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <p className="text-lg font-medium mb-2">No team members found</p>
          <p className="text-gray-500">Team members will appear here once added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member) => (
            <Card key={member.id} className="flex items-center gap-4 p-4 shadow-sm">
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-semibold text-gray-800 break-words">{member.name}</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/admin/OurTeam/edit/${member.id}`)}
                      className="text-blue-600 hover:bg-blue-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:bg-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 break-words">{member.position}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurTeamList;
