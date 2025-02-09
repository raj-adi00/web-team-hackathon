// import React from "react";
// import { FaLinkedin } from "react-icons/fa";
// export interface ProfessorData {
//   name: string;
//   title: string;
//   credentials: string;
//   department: string;
//   university: string;
//   specialization: string;
//   tagline: string;
//   image: string;
//   linkedinUrl: string;
// }

// export interface ProfessorHeroProps {
//   professorData: ProfessorData;
// }

// const ProfessorHero: React.FC<ProfessorHeroProps> = ({ professorData }) => {
//   if (!professorData) return <div></div>;
//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div className="space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight">
//                 {professorData.name}
//               </h1>
//               <div className="space-y-2">
//                 <h2 className="text-2xl md:text-3xl text-blue-700 font-semibold italic">
//                   {professorData.title}
//                 </h2>
//                 <p className="text-lg text-slate-600">
//                   {professorData.credentials}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <p className="text-xl text-slate-700">
//                 {professorData.department}
//               </p>
//               <p className="text-lg text-slate-600">
//                 {professorData.university}
//               </p>
//               <p className="text-lg text-slate-800 font-medium">
//                 Specialization: {professorData.specialization}
//               </p>
//               <p className="text-lg text-slate-700 italic">
//                 {professorData.tagline}
//               </p>
//             </div>

//             <div className="space-y-6">
//               <div className="flex space-x-4">
//                 <a
//                   href={professorData.linkedinUrl}
//                   className="text-slate-600 hover:text-blue-600 transition-colors duration-300 text-2xl"
//                   aria-label="LinkedIn Profile"
//                 >
//                  <FaLinkedin/>
//                 </a>
//               </div>
//               <div className="flex space-x-4">
//                 <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-lg">
//                   View Research
//                 </button>
//                 <button className="bg-slate-100 text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors duration-300 shadow-lg border border-slate-200">
//                   Contact Me
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="relative w-[200px] md:w-[400px] lg:w-[500px] mx-auto">
//             <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
//               <img
//                 src={professorData.image}
//                 alt={professorData.name}
//                 className="object-cover w-full h-full"
//                 loading="lazy"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfessorHero;

import React from "react";
import { motion } from "framer-motion";
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.4,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              className="space-y-4"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, type: "spring" }}
              >
                {professorData.name}
              </motion.h1>
              <div className="space-y-2">
                <motion.h2
                  className="text-2xl md:text-3xl text-blue-700 font-semibold italic"
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {professorData.title}
                </motion.h2>
                <motion.p
                  className="text-lg text-slate-600"
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {professorData.credentials}
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.p className="text-xl text-slate-700" variants={fadeIn}>
                {professorData.department}
              </motion.p>
              <motion.p className="text-lg text-slate-600" variants={fadeIn}>
                {professorData.university}
              </motion.p>
              <motion.p
                className="text-lg text-slate-800 font-medium"
                variants={fadeIn}
              >
                Specialization: {professorData.specialization}
              </motion.p>
              <motion.p
                className="text-lg text-slate-700 italic"
                variants={fadeIn}
              >
                {professorData.tagline}
              </motion.p>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="flex space-x-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.a
                  href={professorData.linkedinUrl}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-300 text-2xl"
                  aria-label="LinkedIn Profile"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin />
                </motion.a>
              </motion.div>
              <div className="flex space-x-4">
                <motion.button
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Research
                </motion.button>
                <motion.button
                  className="bg-slate-100 text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors duration-300 shadow-lg border border-slate-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-[200px] md:w-[400px] lg:w-[500px] mx-auto"
            initial="hidden"
            animate="visible"
            variants={imageVariant}
          >
            <motion.div
              className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={professorData.image}
                alt={professorData.name}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorHero;
