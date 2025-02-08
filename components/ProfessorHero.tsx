import React from "react";
import { FaLinkedin } from "react-icons/fa";
export interface ProfessorData {
  name: string;
  title: string;
  credentials: string;
  department: string;
  university: string;
  specialization: string;
  tagline: string;
  image: string;
  linkedinUrl: string;
}

export interface ProfessorHeroProps {
  professorData: ProfessorData;
}

const ProfessorHero: React.FC<ProfessorHeroProps> = ({ professorData }) => {
  if (!professorData) return <div></div>;
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight">
                {professorData.name}
              </h1>
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl text-blue-700 font-semibold italic">
                  {professorData.title}
                </h2>
                <p className="text-lg text-slate-600">
                  {professorData.credentials}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-slate-700">
                {professorData.department}
              </p>
              <p className="text-lg text-slate-600">
                {professorData.university}
              </p>
              <p className="text-lg text-slate-800 font-medium">
                Specialization: {professorData.specialization}
              </p>
              <p className="text-lg text-slate-700 italic">
                {professorData.tagline}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex space-x-4">
                <a
                  href={professorData.linkedinUrl}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-300 text-2xl"
                  aria-label="LinkedIn Profile"
                >
                 <FaLinkedin/>
                </a>
              </div>
              <div className="flex space-x-4">
                <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-lg">
                  View Research
                </button>
                <button className="bg-slate-100 text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors duration-300 shadow-lg border border-slate-200">
                  Contact Me
                </button>
              </div>
            </div>
          </div>

          <div className="relative w-[200px] md:w-[400px] lg:w-[500px] mx-auto">
            <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src={professorData.image}
                alt={professorData.name}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorHero;
