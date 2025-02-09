// import React from "react";

// interface EducationProps {
//   degree: string;
//   fieldOfStudy?: string;
//   institution: string;
//   yearOfCompletion: number;
// }

// const EducationCard: React.FC<EducationProps> = ({
//   degree,
//   fieldOfStudy,
//   institution,
//   yearOfCompletion,
// }) => {
//   return (
//     <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700 max-w-[30vw]">
//       <h3 className="text-xl font-semibold">
//         {degree} {fieldOfStudy && "in"} {fieldOfStudy && fieldOfStudy}
//       </h3>
//       <p className="text-gray-300">{institution}</p>
//       <p className="text-gray-400">Year: {yearOfCompletion}</p>
//     </div>
//   );
// };

// export default EducationCard;


import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

interface EducationProps {
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  yearOfCompletion: number;
}

const EducationCard: React.FC<EducationProps> = ({
  degree,
  fieldOfStudy,
  institution,
  yearOfCompletion,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="relative overflow-hidden group"
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content container */}
        <div className="relative z-10">
          {/* Degree and Field */}
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {degree} {fieldOfStudy && "in"} {fieldOfStudy && fieldOfStudy}
          </h3>
          
          {/* Institution */}
          <p className="text-gray-300 font-medium mb-2 transition-colors group-hover:text-white">
            {institution}
          </p>
          
          {/* Year */}
          <div className="flex items-center mt-4">
            <span className="text-gray-400 text-sm bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700/50">
              {yearOfCompletion}
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};

export default EducationCard;