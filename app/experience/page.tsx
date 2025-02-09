"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import Loader from "@/components/Loader";

interface Experience {
  _id: string;
  instituteName: string;
  startDate: { month: string; year: number };
  endDate: { month: string; year: number };
  courses: string[];
  description?: string;
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((error) => console.error("Error fetching experiences:", error))
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br text-white flex flex-col items-center p-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold mb-8 text-center text-blue-900"
      >
        Teaching Experience
      </motion.h1>

      {loading ? (
        <Loader />
      ) : experiences.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-400"
        >
          No experience added yet.
        </motion.p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp._id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ExperienceCard {...exp} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}