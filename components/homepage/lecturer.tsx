import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { prata } from "@/font";

const lecturers = [
  {
    name: "Dr. (Mrs.) Chigozie Obaseki",
    title: "Head of Department, Physiotherapy SBMS, University of Benin",
    image: "/obaseki.jpg",
  },
  {
    name: "Prof. Kayode .I. Oke",
    title: "Pioneer Head, Department of Physiotherapy,SBMS UNIBEN",
    image: "/oke.png",
  },
  {
    name: "PT. E. Okhuahesuyi",
    title: "Lecturer, Department of Physiotherapy, SBMS UNIBEN",
    image: "/user.jpg",
  },
  {
    name: "Dr.(Mrs) Seun Kubeyinje",
    title: "Lecturer 1, Department of Physiotherapy, SBMS UNIBEN",
    image: "/user.jpg",
  },
  {
    name: "Dr.Nicholas Satuday Oghumu",
    title: "Lecturer 1, Department of Physiotherapy, SBMS UNIBEN",
    image: "/user.jpg",
  },
];

export const Lecturers = () => {
  return (
    <div className="my-10 px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Our Esteemed Lecturers
      </h1>

      {/* Grid Layout */}
      <div className="grid gap-6 grid-cols-1  lg:grid-cols-3 xl:grid-cols-4">
        {lecturers.map((lecturer, index) => (
          <Card
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            {/* Lecturer Image */}
            <img
              src={lecturer.image}
              alt={lecturer.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            {/* Lecturer Name */}
            <h2
              className={cn(
                "text-lg font-semibold text-gray-800",
                prata.className
              )}
            >
              {lecturer.name}
            </h2>
            {/* Lecturer Title */}
            <p className="text-sm text-gray-600 mt-1">{lecturer.title}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
