// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Briefcase } from "lucide-react";

// const jobs = [
//   { title: "Frontend Developer", location: "Remote", type: "Full-time" },
//   { title: "Backend Engineer", location: "New York, NY", type: "Full-time" },
//   { title: "UI/UX Designer", location: "San Francisco, CA", type: "Contract" },
// ];

// export default function Career() {
//   return (
//     <div id="career" className="max-w-4xl mx-auto p-6 space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-900">Join Our Team</h1>
//         <p className="text-gray-600 mt-2">Grow your career with us. Explore our latest job opportunities.</p>
//       </div>
      
//       <div className="space-y-4">
//         {jobs.map((job, index) => (
//           <Card key={index} className="p-4 border border-gray-200 rounded-lg">
//             <CardContent className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-lg font-semibold">{job.title}</h2>
//                 <p className="text-sm text-gray-500">{job.location} - {job.type}</p>
//               </div>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <Briefcase size={16} /> Apply
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
