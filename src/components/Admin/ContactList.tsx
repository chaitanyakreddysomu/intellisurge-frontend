import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Mail, Trash } from "lucide-react";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios
      .get("https://intellisurgetechnologies.onrender.com/api/contact/") // Your backend endpoint
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Failed to fetch contacts:", err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact entry?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://intellisurgetechnologies.onrender.com/api/contact/${id}/`);
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Submissions</h1>
      </div>

      {loading ? (
        <p>Loading contact entries...</p>
      ) : contacts.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <Mail className="h-12 w-12 text-gray-400 mb-4 mx-auto" />
          <p className="text-lg font-medium mb-2">No contact submissions yet</p>
          <p className="text-gray-500">You'll see them here once users submit the contact form.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Email</th>
                {/* <th className="py-3 px-4">Address</th> */}
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Domain</th>
                <th className="py-3 px-4">Technologies</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                  <td className="py-3 px-4 font-medium">{contact.fullname}</td>
                  <td className="py-3 px-4">{contact.email}</td>
                  {/* <td className="py-3 px-4">{contact.address || "Not provided"}</td> */}
                  <td className="py-3 px-4">{contact.company}</td>
                  <td className="py-3 px-4">{contact.domain}</td>
                  <td className="py-3 px-4">{contact.technologies}</td>
                  <td className="py-3 px-4">{contact.message}</td>
                  <td className="py-3 px-4">
                  <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-500"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;
