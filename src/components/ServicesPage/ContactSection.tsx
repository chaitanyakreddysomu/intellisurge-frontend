import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, X } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    company: "",
    message: "",
    domain: "",
  });

  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const items = techInput
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item && !technologies.includes(item));

      setTechnologies((prev) => [...prev, ...items]);
      setTechInput("");
    }
  };

  const removeTech = (index: number) => {
    setTechnologies((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const payload = {
      fullname: formData.fullname,
      email: formData.email,
      address: "Not provided", // optional field
      company: formData.company,
      domain: formData.domain,
      technologies: technologies.join(", "),
      message: formData.message,
    };

    try {
      const res = await fetch("https://intellisurgetechnologies.onrender.com/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMessage("Message sent successfully!");
        setFormData({
          fullname: "",
          email: "",
          company: "",
          message: "",
          domain: "",
        });
        setTechnologies([]);
        setTechInput("");
      } else {
        const errData = await res.json();
        console.error("Error:", errData);
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Contact Us</h2>
        <p className="text-gray-600 mb-10 max-w-3xl">
          Have questions about our services or want to discuss how we can help your business?
          Reach out to us using the form below or contact us directly.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullname" className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-700">Company</label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full text-gray-800 placeholder-gray-400"
                  placeholder="Company name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="domain" className="text-sm font-medium text-gray-700">Domain</label>
                <Input
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full text-gray-800 placeholder-gray-400"
                  placeholder="e.g. Healthcare, Finance"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="technologies" className="text-sm font-medium text-gray-700">
                  Technologies Client is Looking For
                </label>
                <Input
                  id="technologies"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleTechKeyDown}
                  placeholder="e.g. React, Node.js, AWS"
                  className="w-full text-gray-800 placeholder-gray-400"
                />
                <div className="flex flex-wrap mt-2 gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="flex items-center bg-[rgba(13,59,102,1)] text-white rounded-full px-3 py-1 text-sm"
                    >
                      {tech}
                      <X
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={() => removeTech(index)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or inquiry..."
                  rows={5}
                  required
                  className="w-full text-gray-800 placeholder-gray-400"
                />
              </div>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>

              {successMessage && (
                <p className="text-green-600 mt-2">{successMessage}</p>
              )}
            </form>
          </div>

          {/* Sidebar unchanged */}
          <div className="bg-blue-50 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold text-blue-800 mb-6">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-700">info@intellisurge.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-700">+91 7416577487</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="text-gray-700">
                    Workafella Western Pearl, Hitech City,<br />
                    1st Floor, Kondapur, Hyderabad,<br />
                    Telangana 500084, India.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="font-medium text-gray-900 mb-3">Business Hours</h4>
              <p className="text-gray-700">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday - Sunday: Closed
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
