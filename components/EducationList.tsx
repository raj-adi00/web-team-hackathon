// import React from "react";
// import EducationCard from "./EducationCard";

// interface Education {
//   _id: string;
//   degree: string;
//   fieldOfStudy?: string;
//   institution: string;
//   yearOfCompletion: number;
// }

// interface EducationListProps {
//   educationList: Education[];
// }

// const EducationList: React.FC<EducationListProps> = ({ educationList }) => {
//   if (educationList.length === 0) {
//     return null;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 p-2 px-4 gap-6">
//       {educationList.map((edu) => (
//         <EducationCard key={edu._id} {...edu} />
//       ))}
//     </div>
//   );
// };

// export default EducationList;
import React from "react";
import { motion } from "framer-motion";
import EducationCard from "./EducationCard";

interface Education {
  _id: string;
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  yearOfCompletion: number;
}

interface EducationListProps {
  educationList: Education[];
}

const EducationList: React.FC<EducationListProps> = ({ educationList }) => {
  if (educationList.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-3 p-2 px-4 gap-6"
    >
      {educationList.map((edu, index) => (
        <motion.div
          key={edu._id}
          variants={itemVariants}
          className="relative"
        >
          {/* Glassy background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-lg backdrop-blur-md border border-white/20 shadow-xl" />
          
          {/* Card content with subtle hover animation */}
          <motion.div 
            className="relative z-10"
            whileHover={{
              rotateY: 5,
              rotateX: 5,
              transition: { duration: 0.2 }
            }}
          >
            <EducationCard {...edu} />
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity blur" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EducationList;